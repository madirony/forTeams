package com.forteams.chatbot.chat.service;

import com.forteams.chatbot.chat.dto.ChatbotDto;
import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import com.forteams.chatbot.chat.repository.ChatbotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RestTemplate restTemplate;

    public ChatbotDto processReceivedMessage(ChatbotDto dto, String chatbotUUID) {

        LocalDateTime now = LocalDateTime.now();
        dto.setCreatedAt(String.valueOf(now));
        dto.setUpdatedAt(String.valueOf(now));

        String messageUUID = UUID.randomUUID().toString();
        dto.setChatUUID(messageUUID);

        addChatLog(chatbotUUID, dto);
        return dto;
    }

    public void saveAskData(String chatUUID, String chatbotUUID, StringBuilder sb) {
        ChatbotDto assistant = new ChatbotDto();
        assistant.setChatUUID(chatUUID); assistant.setType("ask");
        assistant.setSender("BOT"); assistant.setMsg(String.valueOf(sb));

        LocalDateTime now = LocalDateTime.now();
        assistant.setCreatedAt(String.valueOf(now));
        assistant.setUpdatedAt(String.valueOf(now));

        addChatLog(chatbotUUID, assistant);
    }

    public ChatbotDto processRecommendMessage(ChatbotDto dto, String chatbotUUID) {
        String response = callExternalAPI(dto.getMsg());
        log.info("Response from external API: {}", response);

        LocalDateTime now = LocalDateTime.now();
        dto.setCreatedAt(String.valueOf(now));
        dto.setUpdatedAt(String.valueOf(now));

        dto.setSender("BOT");
        dto.setMsg(response);

        addChatLog(chatbotUUID, dto);
        return dto;
    }

    private String callExternalAPI(String question) {
        String url = "http://forteams.co.kr:8085/recommandation/question";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("question", question);
        return restTemplate.getForObject(builder.toUriString(), String.class);
    }

    private void addChatLog(String chatbotUUID, ChatbotDto newLog) {
        ChatbotLogSet logSet = chatbotRepository.findById(chatbotUUID).orElse(null);
        if (logSet != null) {
            logSet.addChatLogEntry(newLog);
            chatbotRepository.save(logSet);
        } else {
            logSet = new ChatbotLogSet();
            logSet.setUserUUID(chatbotUUID);
            logSet.addChatLogEntry(newLog);
            chatbotRepository.save(logSet);
        }
    }
}
