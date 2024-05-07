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
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final OpenChatService openChatService;
    //
    @MessageMapping("openchat.message")
    public void sendMessage(@Payload OpenChatDto openChatDto) throws JsonProcessingException {
        //            OpenChatDto openChatDto = objectMapper.readValue(rawMessage, OpenChatDto.class);
        openChatService.processReceivedMessage(openChatDto);
        rabbitTemplate.convertAndSend("openchat.exchange", "chat", openChatDto);
    }

    @RabbitListener(queues = "openchat.queue")
    public void receive(OpenChatDto openChatDto) {
        log.info("Data received ::: {}", openChatDto);
    }
}
