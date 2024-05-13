package com.forteams.openchat.chat.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forteams.openchat.chat.dto.OpenChatDto;
import com.forteams.openchat.chat.entity.OpenChat;
import com.forteams.openchat.chat.service.OpenChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/openchat")
@CrossOrigin(origins = "http://localhost:3000")
public class OpenChatController {
    private final RabbitTemplate rabbitTemplate;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final OpenChatService openChatService;

    @GetMapping("/chats")
    public ResponseEntity<List<OpenChatDto>> getAllChats() {
        List<OpenChatDto> chats = openChatService.getAllChats();
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/today")
    public ResponseEntity<List<OpenChatDto>> getTodaysChats() {
        List<OpenChatDto> chats = openChatService.getTodayChats();
        return ResponseEntity.ok(chats);
    }

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
