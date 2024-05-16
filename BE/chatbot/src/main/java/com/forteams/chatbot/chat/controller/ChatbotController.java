package com.forteams.chatbot.chat.controller;

import com.forteams.chatbot.chat.dto.*;
import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import com.forteams.chatbot.chat.entity.SavedChatLogSet;
import com.forteams.chatbot.chat.service.ChatbotService;
import com.forteams.chatbot.chat.service.StreamStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.Disposable;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatbotController {
    private final RabbitTemplate rabbitTemplate;
    private final ChatbotService chatbotService;
    private final StreamStatusService streamStatusService;

    @PostMapping("/share/{chatbotChatUUID}")
    public ResponseEntity<String> shareChat(@PathVariable String chatbotChatUUID) {
        chatbotService.updateShareFlag(chatbotChatUUID);
        String shareLink = "https://forteams.co.kr/share/" + chatbotChatUUID;
        return ResponseEntity.ok(shareLink);
    }

    @GetMapping("/saved-chats/{userUUID}")
    public ResponseEntity<List<UserAllChatListDto>> getSavedChatIDs(@PathVariable String userUUID) {
        List<UserAllChatListDto> chatIDs = chatbotService.getChatIDsByUserUUID(userUUID);
        if (chatIDs.isEmpty()) {
            log.info("No saved chats found for userUUID: {}", userUUID);
        }
        return ResponseEntity.ok(chatIDs);
    }

    @GetMapping("/saved-chats/detail/{chatbotChatUUID}")
    public ResponseEntity<SavedChatLogSet> getSavedChatDetails(@PathVariable String chatbotChatUUID) {
        Optional<SavedChatLogSet> savedChatLogSet = chatbotService.getChatLogByUUID(chatbotChatUUID);
        return savedChatLogSet
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/save")
    public ResponseEntity<ChatbotSaveResponseDto> saveChats(@RequestBody SaveChatRequest request) {
        return ResponseEntity.ok(chatbotService.saveToSavedChats(request.getUserUUID(), request.getChatUUID()));
    }

    @PostMapping("/load-chat/{chatbotChatUUID}")
    public ResponseEntity<String> loadChatLog(@PathVariable String chatbotChatUUID) {
        chatbotService.loadChatLog(chatbotChatUUID);
        return ResponseEntity.ok(chatbotChatUUID);
    }

    @PostMapping("/func")
    public ResponseEntity<String> getRecommendation(@RequestHeader("userDept") String userDept) {
        if (userDept == null || userDept.isEmpty()) {
            return ResponseEntity.badRequest().body("Department info is missing");
        }
        String recommendation = chatbotService.fetchRecommendation(userDept);

        return ResponseEntity.ok(recommendation);
    }

    @PostMapping("/stop-stream/{chatbotUUID}")
    public ResponseEntity<String> stopStream(@PathVariable String chatbotUUID) {
        streamStatusService.stopStream(chatbotUUID);
        return ResponseEntity.ok("Stream stopped for chatbotUUID: " + chatbotUUID);
    }

    @GetMapping("/chattingUUID/{chatbotUUID}")
    public ResponseEntity<ChatbotSessionUUIDDto> getChatUUID(@PathVariable String chatbotUUID){
        ChatbotSessionUUIDDto chatbotSessionUUIDDto = chatbotService.getChatbotChatUUID(chatbotUUID);
        return ResponseEntity.ok(chatbotSessionUUIDDto);
    }

    @GetMapping("/load-chatlogs/{chatbotChatUUID}")
    public ResponseEntity<ChatbotLogSet> getChatLogs(@PathVariable String chatbotChatUUID) {
        Optional<ChatbotLogSet> chatLogs = chatbotService.getChatLogsByUUID(chatbotChatUUID);
        return chatLogs.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete-chat/{chatbotChatUUID}")
    public ResponseEntity<String> deleteChatLog(@PathVariable String chatbotChatUUID) {
        try {
            chatbotService.deleteChatLog(chatbotChatUUID);
            return ResponseEntity.ok("Deleted chat log with UUID: " + chatbotChatUUID);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @MessageMapping("chatbot.message.{chatbotUUID}")
    public void sendMessage(@Payload ChatbotDto chatbotDto, @DestinationVariable String chatbotUUID,
                            @Header("msUuid") String userId, @Header("userNickname") String userNickname,
                            @Header("userDept") String userDept) {

        chatbotDto = chatbotService.processReceivedMessage(chatbotDto, chatbotUUID);

        MessageUser user = new MessageUser(userNickname, userId, userDept);

        switch (chatbotDto.getType()) {
            case "recommend":
                recommendResponse(chatbotDto.getChatUUID(), chatbotUUID, user);
                break;
            case "ask":
                rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                streamData(chatbotDto.getChatUUID(), chatbotUUID, new StringBuilder(), user);
                break;
        }
    }

    private void recommendResponse(String chatUUID, String chatbotUUID, MessageUser user) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for recommendation");
            return;
        }

        MessageRequest messageRequest = new MessageRequest(user, validMessages.toArray(new Message[0]));

        WebClient webClient = WebClient.create("http://forteams.co.kr:8085");
        webClient.post()
                .uri("/recommendation")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(
                        Mono.just(messageRequest), MessageRequest.class
                ))
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(data -> {
                    ChatbotDto chatbotDto = new ChatbotDto("recommendRes", "BOT", chatUUID, data, -1);

                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                })
                .doOnTerminate(() -> log.info("Recommendation request completed"))
                .subscribe(
                        data -> log.info("Recommendation completed with data: {}", data),
                        error -> log.error("Error while processing recommendation data: {}", error.getMessage())
                );
    }

    private void streamData(String chatUUID, String chatbotUUID, StringBuilder sb, MessageUser user) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for streaming");
            return;
        }

        MessageRequest messageRequest = new MessageRequest(user, validMessages.toArray(new Message[0]));

        AtomicInteger sequence = new AtomicInteger(0);
        streamStatusService.startStream(chatbotUUID);

        WebClient webClient = WebClient.create("http://forteams.co.kr:8085");
        Disposable disposable = webClient.post()
                .uri("/ask")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(
                        Mono.just(messageRequest), MessageRequest.class
                ))
                .retrieve()
                .bodyToFlux(String.class)
                .takeWhile(data -> streamStatusService.isStreamActive(chatbotUUID))
                .doOnNext(data -> {
                    ChatbotDto chatbotDto = new ChatbotDto("stream", "BOT", chatUUID, data, -1);
                    chatbotDto.setSequence(sequence.getAndIncrement());
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                    sb.append(data);
                })
                .doFinally(signalType -> {
                    streamFinish(chatUUID, chatbotUUID, sb);
                    streamStatusService.removeStream(chatbotUUID);
                })
                .subscribe(
                        data -> log.info("Streaming data: {}", data),
                        error -> log.error("Error while streaming data: {}", error.getMessage()),
                        () -> log.info("Streaming Completed")
                );
    }

    private void streamFinish(String chatUUID, String chatbotUUID, StringBuilder sb) {
        chatbotService.saveAskData(chatUUID, chatbotUUID, sb);
        sb.setLength(0);

        ChatbotDto chatbotDto = new ChatbotDto();
        chatbotDto.setType("streamFin");
        chatbotDto.setSender("BOT");
        chatbotDto.setChatUUID(chatUUID);
        rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);

        chatbotDto.setType("recommendFin");
        rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
    }

    @RabbitListener(queues = "chatbot.queue")
    public void receive(ChatbotDto chatbotDto) {
        if (chatbotDto.getType().equals("recommend")) {
//            log.info("Data received ::: {}", chatbotDto);
        }
    }
}
