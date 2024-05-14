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
import java.util.Map;
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
//    private final RestTemplate restTemplate;

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
    public ResponseEntity<ChatbotSaveResponseDto> saveChats(@RequestBody String userUUID) {
        return ResponseEntity.ok(chatbotService.saveToSavedChats(userUUID));
    }

    @PostMapping("/func")
    public ResponseEntity<String> getRecommendation(
//                            @RequestHeader("msUuid") String msUuid,
//                            @RequestHeader("userNickname") String userNickname,
//                            @RequestHeader("department") String department
    ) {
        String department = "A";

        if (department == null || department.isEmpty()) {
            return ResponseEntity.badRequest().body("Department info is missing");
        }

        String recommendation = chatbotService.fetchRecommendation(department);
        return ResponseEntity.ok(recommendation);
    }

    @MessageMapping("chatbot.message.{chatbotUUID}")
    public void sendMessage(@Payload ChatbotDto chatbotDto, @DestinationVariable String chatbotUUID
//            ,
//                            @RequestHeader("msUuid") String msUuid,
//                            @RequestHeader("userNickname") String userNickname,
//                            @RequestHeader("department") String department
//            or                SimpMessageHeaderAccessor headerAccessor
    ) {
        log.info("message Received");

        // 헤더 정보 액세스
//        String msUuid = headerAccessor.getFirstNativeHeader("msUuid");
//        String userNickname = headerAccessor.getFirstNativeHeader("userNickname");
//        String department = headerAccessor.getFirstNativeHeader("department");
//
//        log.info("msUuid: {}, userNickname: {}, department: {}", msUuid, userNickname, department);

        chatbotDto = chatbotService.processReceivedMessage(chatbotDto, chatbotUUID);
        switch(chatbotDto.getType()){
            case "recommend":
                recommendResponse(chatbotDto.getChatUUID(), chatbotUUID);
//                recommendResponse(chatbotDto.getChatUUID(), chatbotUUID, msUuid, userNickname, department);
                break;

            case "ask":
                rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                streamData(chatbotDto.getChatUUID(), chatbotUUID, new StringBuilder());
//                streamData(chatbotDto.getChatUUID(), chatbotUUID, new StringBuilder(), msUuid, userNickname, department);
                break;
        }
    }

    private void recommendResponse(String chatUUID, String chatbotUUID) {
//    private void recommendResponse(String chatUUID, String chatbotUUID, String msUuid, String userNickname, String department) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for recommendation");
            return;
        }

        //tmp User
        MessageUser user = new MessageUser("손준성", "123", "A");
//        MessageUser user = new MessageUser(userNickname, msUuid, department);
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
//    private void streamData(String chatUUID, String chatbotUUID, StringBuilder sb, String msUuid, String userNickname, String department) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for streaming");
            return;
        }

        //tmp User
        MessageUser user = new MessageUser("손준성", "123", "A");
//        MessageUser user = new MessageUser(userNickname, msUuid, department);
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
