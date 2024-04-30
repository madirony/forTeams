package com.forteams.openchat.chat.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forteams.openchat.chat.dto.OpenChatDto;
import com.forteams.openchat.chat.service.OpenChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class OpenChatController {
    private final RabbitTemplate rabbitTemplate;
//    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final OpenChatService openChatService;

    private static final String OPENCHAT_QUEUE_NAME = "openchat.queue";
    private static final String OPENCHAT_EXCHANGE_NAME = "openchat.exchange";

    @MessageMapping("openchat.message")
    public void sendMessage(@Payload String rawMessage) throws JsonProcessingException {
        OpenChatDto openChatDto = objectMapper.readValue(rawMessage, OpenChatDto.class);
        openChatService.processReceivedMessage(openChatDto); // Redis에 저장 및 메시지 처리
        rabbitTemplate.convertAndSend(OPENCHAT_EXCHANGE_NAME, "chat", openChatDto);
    }

    @RabbitListener(queues = OPENCHAT_QUEUE_NAME)
    public void receive(OpenChatDto openChatDto) {
        log.info("Data received ::: " + openChatDto);
//        openChatService.processReceivedMessage(openChatDto);
    }
}
