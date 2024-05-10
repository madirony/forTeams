package com.forteams.chatbot.chat.controller;

import com.forteams.chatbot.chat.dto.*;
import com.forteams.chatbot.chat.entity.SavedChatLogSet;
import com.forteams.chatbot.chat.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {
    private final RabbitTemplate rabbitTemplate;
    private final ChatbotService chatbotService;
//    private final RestTemplate restTemplate;

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
    public ResponseEntity<String> saveChats(@RequestBody String userUUID) {
        chatbotService.saveToSavedChats(userUUID);
        return ResponseEntity.ok("Completed " + userUUID);
    }

    @MessageMapping("chatbot.message.{chatbotUUID}")
    public void sendMessage(@Payload ChatbotDto chatbotDto, @DestinationVariable String chatbotUUID) {
        log.info("message Received");
        chatbotDto = chatbotService.processReceivedMessage(chatbotDto, chatbotUUID);
        switch(chatbotDto.getType()){
            case "recommend":
                recommendResponse(chatbotDto.getChatUUID(), chatbotUUID);
                break;

            case "ask":
                rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                streamData(chatbotDto.getChatUUID(), chatbotUUID, new StringBuilder());
                break;
        }
    }

    private void recommendResponse(String chatUUID, String chatbotUUID) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for recommendation");
            return;
        }

        //tmp User
        MessageUser user = new MessageUser("게임의황제손준성", "123", "Keroro");
        MessageRequest messageRequest = new MessageRequest(user, validMessages.toArray(new Message[0]));

        WebClient webClient = WebClient.create("http://forteams.co.kr:8085");
        webClient.post()
                .uri("/recommendation")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(
                        Mono.just(messageRequest), MessageRequest.class
                ))
                .retrieve()
                .bodyToMono(String.class)  // 단일 객체 응답 처리
                .doOnNext(data -> {
                    ChatbotDto chatbotDto = new ChatbotDto("recommendRes", "BOT", chatUUID, data, -1);
                    log.info(String.valueOf(chatbotDto));
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                })
                .doOnTerminate(() -> {
                })
                .subscribe(
                        data -> {
                            log.info("Recommendation completed with data: {}", data);
                        }, error -> {
                            log.error("Error while processing recommendation data: {}", error.getMessage());
                        }
                );
    }

    private void streamData(String chatUUID, String chatbotUUID, StringBuilder sb) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for streaming");
            return;
        }

        //tmp User
        MessageUser user = new MessageUser("게임의황제손준성", "123", "Keroro");
        MessageRequest messageRequest = new MessageRequest(user, validMessages.toArray(new Message[0]));

        AtomicInteger sequence = new AtomicInteger(0);  // 시퀀스 번호 추가

        WebClient webClient = WebClient.create("http://forteams.co.kr:8085");
        webClient.post()
                .uri("/ask")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(
                        Mono.just(
                                messageRequest
                        ), MessageRequest.class
                ))
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(data -> {
                    ChatbotDto chatbotDto = new ChatbotDto("stream", "BOT", chatUUID, data, -1);
                    chatbotDto.setSequence(sequence.getAndIncrement());  // 시퀀스 번호 설정
                    log.info(String.valueOf(chatbotDto.getSequence()));
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                    sb.append(data);
                })
                .doOnComplete(() -> {
                    chatbotService.saveAskData(chatUUID, chatbotUUID, sb);
                    sb.setLength(0);

                    ChatbotDto chatbotDto = new ChatbotDto();
                    chatbotDto.setType("streamFin"); chatbotDto.setSender("BOT"); chatbotDto.setChatUUID(chatUUID);
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);

                    chatbotDto.setType("recommendFin");  // 스트림이 끝나면, 추천Fin 플래그
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                })
                .subscribe(
                    data -> {
//                        log.info(data + " 출력 출력 ");
                    }, error -> log.error("Error while streaming data: {}", error.getMessage()),
                    () -> log.info("Streaming Completed")
                );
    }

    @RabbitListener(queues = "chatbot.queue")
    public void receive(ChatbotDto chatbotDto) {
        if(chatbotDto.getType().equals("recommend")) {
            log.info("Data received ::: {}", chatbotDto);
        }
    }
}
