package com.forteams.chatbot.chat.controller;

import com.forteams.chatbot.chat.dto.ChatbotDto;
import com.forteams.chatbot.chat.dto.Message;
import com.forteams.chatbot.chat.dto.MessageRequest;
import com.forteams.chatbot.chat.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatbotController {
    private final RabbitTemplate rabbitTemplate;
    private final ChatbotService chatbotService;
    private final RestTemplate restTemplate;

    @MessageMapping("chatbot.message.{chatbotUUID}")
    public void sendMessage(@Payload ChatbotDto chatbotDto, @DestinationVariable String chatbotUUID) {
        chatbotDto = chatbotService.processReceivedMessage(chatbotDto, chatbotUUID);
        rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
        switch(chatbotDto.getType()){

            case "recommend":
//                chatbotDto = chatbotService.processRecommendMessage(chatbotDto, chatbotUUID);
                rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                break;

            case "ask":
                StringBuilder sb = new StringBuilder();
                streamData(chatbotDto.getChatUUID(), chatbotUUID, sb);
                break;
        }
    }

    private void streamData(String chatUUID, String chatbotUUID, StringBuilder sb) {
        List<Message> validMessages = chatbotService.validateMessageRequest(chatbotService.fetchRecentMessages(chatbotUUID));

        if (validMessages.isEmpty()) {
            log.error("No valid messages available for streaming");
            return;
        }

        MessageRequest messageRequest = new MessageRequest(validMessages.toArray(new Message[0]));

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
                    ChatbotDto chatbotDto = new ChatbotDto("stream", "BOT", chatUUID, data);
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                    sb.append(data);
                })
                .doOnComplete(() -> {
                    chatbotService.saveAskData(chatUUID, chatbotUUID, sb);
                    sb.setLength(0);

                    ChatbotDto chatbotDto = new ChatbotDto();
                    chatbotDto.setType("streamFin"); chatbotDto.setSender("BOT"); chatbotDto.setChatUUID(chatUUID);
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
        log.info("Data received ::: {}", chatbotDto);
    }
}
