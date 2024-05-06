package com.forteams.chatbot.chat.controller;

import com.forteams.chatbot.chat.dto.ChatbotDto;
import com.forteams.chatbot.chat.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import org.springframework.web.reactive.function.client.WebClient;

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
                chatbotDto = chatbotService.processRecommendMessage(chatbotDto, chatbotUUID);
                rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                break;
            case "ask":
                // 스트리밍 데이터 처리 로직 추가
                StringBuilder sb = new StringBuilder();
                streamData(chatbotDto.getChatUUID(), chatbotUUID, sb);
                break;
        }
    }

    private void streamData(String chatUUID, String chatbotUUID, StringBuilder sb) {
        // WebClient를 사용하여 스트리밍 데이터 소스에 연결
        WebClient webClient = WebClient.create("http://forteams.co.kr:8085");
        webClient.post()
                .uri("/streamtest")  // 이 URI는 실제 스트리밍 데이터를 제공하는 URI로 변경해야 함
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(data -> {
                    sb.append(data);
                    ChatbotDto chatbotDto = new ChatbotDto();
                    chatbotDto.setType("stream"); chatbotDto.setSender(false); chatbotDto.setChatUUID(chatbotUUID); chatbotDto.setMsg(data);
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                })
                .doOnComplete(() -> {
                    chatbotService.saveAskData(chatUUID, chatbotUUID, sb);
                    sb.setLength(0);

                    ChatbotDto chatbotDto = new ChatbotDto();
                    chatbotDto.setType("streamFin"); chatbotDto.setSender(false); chatbotDto.setChatUUID(chatbotUUID);
                    rabbitTemplate.convertAndSend("chatbot.exchange", "chatbot." + chatbotUUID, chatbotDto);
                })
                .subscribe(
                    data -> {}, error -> log.error("Error while streaming data: {}", error.getMessage()),
                    () -> log.info("Streaming Completed")
                );
    }

    @RabbitListener(queues = "chatbot.queue")
    public void receive(ChatbotDto chatbotDto) {
        log.info("Data received ::: {}", chatbotDto);
    }
}
