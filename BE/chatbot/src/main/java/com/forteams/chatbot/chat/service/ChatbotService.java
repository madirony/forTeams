package com.forteams.chatbot.chat.service;

import com.forteams.chatbot.chat.dto.ChatbotDto;
import com.forteams.chatbot.chat.dto.Message;
import com.forteams.chatbot.chat.dto.UserAllChatListDto;
import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import com.forteams.chatbot.chat.entity.SavedChatLogSet;
import com.forteams.chatbot.chat.repository.ChatbotRepository;
import com.forteams.chatbot.chat.repository.SavedChatLogSetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final SavedChatLogSetRepository savedChatLogSetRepository;
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

    public List<Message> fetchRecentMessages(String chatbotUUID) {
        return chatbotRepository.findById(chatbotUUID)
                .map(chatbotLogSet -> chatbotLogSet.getChatLogs().stream()
                        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                        .limit(7)
                        .map(dto -> new Message("USER".equals(dto.getSender()) ? "user" : "assistant", dto.getMsg()))
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    public List<Message> validateMessageRequest(List<Message> messages) {

        List<Message> filteredMessages = messages.stream()
                .filter(m -> m.getContent() != null && !m.getContent().isEmpty())
                .collect(Collectors.toList());

        Collections.reverse(filteredMessages);
//        filteredMessages.forEach(m -> log.info("Reversed Message: {}", m.getContent()));
        return filteredMessages;
    }

    public void saveToSavedChats(String userUUID) {
        Optional<ChatbotLogSet> optionalLogSet = chatbotRepository.findById(userUUID);
        if (optionalLogSet.isPresent()) {
            ChatbotLogSet logSet = optionalLogSet.get();

            SavedChatLogSet savedLogSet = new SavedChatLogSet();
            savedLogSet.setUserUUID(logSet.getUserUUID());
            savedLogSet.setChatbotChatUUID(UUID.randomUUID().toString());
            savedLogSet.setShareFlag("false");

            if(!logSet.getChatLogs().isEmpty()) {
                ChatbotDto tmpDto = logSet.getChatLogs().get(0);
                savedLogSet.setChatTitle(tmpDto.getMsg());
                savedLogSet.setCreatedAt(tmpDto.getCreatedAt());
            }

            savedLogSet.setChatLogs(logSet.getChatLogs());

            savedChatLogSetRepository.save(savedLogSet);

            // 기존 로그 제거
            chatbotRepository.deleteById(logSet.getUserUUID());
        }
    }

    public List<UserAllChatListDto> getChatIDsByUserUUID(String userUUID) {
        return savedChatLogSetRepository.findByUserUUID(userUUID)
                .stream()
                .map(savedChat -> {
                    String chatTitle = savedChat.getChatLogs().stream()
                            .filter(chat -> "ask".equalsIgnoreCase(chat.getType()))
                            .findFirst()
                            .map(chat -> chat.getMsg().length() > 100 ? chat.getMsg().substring(0, 100) + "..." : chat.getMsg())
                            .orElse("No Title");
                    String createdAt = savedChat.getChatLogs().stream()
                            .findFirst()
                            .map(chat -> chat.getCreatedAt())
                            .orElse("N/A");
                    return new UserAllChatListDto(savedChat.getChatbotChatUUID(), chatTitle, createdAt);
                })
                .collect(Collectors.toList());
    }

    public Optional<SavedChatLogSet> getChatLogByUUID(String chatbotChatUUID) {
        return savedChatLogSetRepository.findById(chatbotChatUUID);
    }

    public void updateShareFlag(String chatbotChatUUID) {
        Optional<SavedChatLogSet> optionalSavedChatLogSet = savedChatLogSetRepository.findById(chatbotChatUUID);
        if (optionalSavedChatLogSet.isPresent()) {
            SavedChatLogSet savedChatLogSet = optionalSavedChatLogSet.get();
            if(savedChatLogSet.getChatLogs().equals("false")) {
                savedChatLogSet.setShareFlag("true");
                savedChatLogSetRepository.save(savedChatLogSet);
            }
        } else {
            log.error("Chat log with UUID {} not found", chatbotChatUUID);
            throw new IllegalArgumentException("Chat log not found");
        }
    }

}
