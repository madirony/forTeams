package com.forteams.chatbot.chat.service;

import com.forteams.chatbot.chat.repository.ChatbotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final RedisTemplate<String, Object> redisTemplate;
}
