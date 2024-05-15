package com.forteams.chatbot.chat.service;

import com.forteams.chatbot.chat.dto.*;
import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import com.forteams.chatbot.chat.entity.SavedChatLogSet;
import com.forteams.chatbot.chat.repository.ChatbotLogSetRepository;
import com.forteams.chatbot.chat.repository.SavedChatLogSetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatbotService {
    private final ChatbotLogSetRepository chatbotLogSetRepository;
    private final SavedChatLogSetRepository savedChatLogSetRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RestTemplate restTemplate;
    private final StreamStatusService streamStatusService;

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
        assistant.setChatUUID(chatUUID);
        assistant.setType("ask");
        assistant.setSender("BOT");
        assistant.setMsg(String.valueOf(sb));

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
        String url = "http://forteams.co.kr:8085/recommendation/question";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("question", question);
        return restTemplate.getForObject(builder.toUriString(), String.class);
    }

    private void addChatLog(String chatbotUUID, ChatbotDto newLog) {
        ChatbotLogSet logSet = chatbotLogSetRepository.findById(chatbotUUID).orElse(null);
        if (logSet != null) {
            logSet.addChatLogEntry(newLog);
            chatbotLogSetRepository.save(logSet);
        } else {
            logSet = new ChatbotLogSet();
            logSet.setUserUUID(chatbotUUID);
            logSet.setChatbotChatUUID(UUID.randomUUID().toString());
            logSet.addChatLogEntry(newLog);
            chatbotLogSetRepository.save(logSet);
        }
    }

    public List<Message> fetchRecentMessages(String chatbotUUID) {
        return chatbotLogSetRepository.findById(chatbotUUID)
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
        return filteredMessages;
    }

    public ChatbotSaveResponseDto saveToSavedChats(String userUUID, String chatUUID) {
        Optional<ChatbotLogSet> optionalLogSet;
        if (chatUUID != null) {
            optionalLogSet = chatbotLogSetRepository.findByChatbotChatUUID(chatUUID);
        } else {
            optionalLogSet = chatbotLogSetRepository.findById(userUUID);
        }

        ChatbotSaveResponseDto chatbotSaveResponseDto = new ChatbotSaveResponseDto();
        if (optionalLogSet.isPresent()) {
            ChatbotLogSet logSet = optionalLogSet.get();

            // 비어있는 채팅 로그는 저장하지 않음
            if (logSet.getChatLogs().isEmpty()) {
                log.info("Empty chat logs. Skipping save.");
                return chatbotSaveResponseDto;
            }

            SavedChatLogSet savedLogSet = new SavedChatLogSet();
            savedLogSet.setUserUUID(logSet.getUserUUID());
            savedLogSet.setChatbotChatUUID(logSet.getChatbotChatUUID() != null ? logSet.getChatbotChatUUID() : UUID.randomUUID().toString());
            savedLogSet.setShareFlag("false");

            if (!logSet.getChatLogs().isEmpty()) {
                ChatbotDto tmpDto = logSet.getChatLogs().get(0);
                savedLogSet.setChatTitle(tmpDto.getMsg());
                savedLogSet.setCreatedAt(tmpDto.getCreatedAt());
            }

            savedLogSet.setChatLogs(logSet.getChatLogs());

            savedChatLogSetRepository.save(savedLogSet);

            // 기존 로그 제거
            chatbotLogSetRepository.deleteById(logSet.getUserUUID());

            chatbotSaveResponseDto.setChatbotUuid(savedLogSet.getChatbotChatUUID());
            chatbotSaveResponseDto.setChatbotTitle(savedLogSet.getChatTitle());
        }
        return chatbotSaveResponseDto;
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

    public Optional<ChatbotLogSet> getChatLogsByUUID(String chatbotChatUUID) {
        return chatbotLogSetRepository.findByChatbotChatUUID(chatbotChatUUID);
    }

    public void updateShareFlag(String chatbotChatUUID) {
        Optional<SavedChatLogSet> optionalSavedChatLogSet = savedChatLogSetRepository.findById(chatbotChatUUID);
        if (optionalSavedChatLogSet.isPresent()) {
            SavedChatLogSet savedChatLogSet = optionalSavedChatLogSet.get();
            if ("false".equals(savedChatLogSet.getShareFlag())) {
                savedChatLogSet.setShareFlag("true");
                savedChatLogSetRepository.save(savedChatLogSet);
            }
        } else {
            log.error("Chat log with UUID {} not found", chatbotChatUUID);
            throw new IllegalArgumentException("Chat log not found");
        }
    }

    public String fetchRecommendation(String dept) {
        String url = "http://forteams.co.kr:8085/recommend/function";
        WebClient webClient = WebClient.create(url);

        log.info(">>> 여기에요! 3");
        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(
                        Mono.just(Collections.singletonMap("dept", dept)), Map.class
                ))
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(data -> log.info("Fetched recommendation: {}", data))
                .doOnError(error -> log.error("Error while fetching recommendation: {}", error.getMessage()))
                .block();  // 블록킹으로 결과를 기다림
    }

    public void loadChatLog(String chatbotChatUUID) {
        Optional<SavedChatLogSet> optionalSavedChatLogSet = savedChatLogSetRepository.findById(chatbotChatUUID);
        if (optionalSavedChatLogSet.isPresent()) {
            SavedChatLogSet savedChatLogSet = optionalSavedChatLogSet.get();
            String userUUID = savedChatLogSet.getUserUUID();
            Optional<ChatbotLogSet> optionalChatbotLogSet = chatbotLogSetRepository.findById(userUUID);

            ChatbotLogSet chatbotLogSet;
            if (optionalChatbotLogSet.isPresent()) {
                chatbotLogSet = optionalChatbotLogSet.get();
            } else {
                chatbotLogSet = new ChatbotLogSet();
                chatbotLogSet.setUserUUID(userUUID);
                chatbotLogSet.setChatbotChatUUID(chatbotChatUUID);
            }

            chatbotLogSet.setChatLogs(savedChatLogSet.getChatLogs());
            chatbotLogSetRepository.save(chatbotLogSet);
        } else {
            log.error("Saved chat log with UUID {} not found", chatbotChatUUID);
            throw new IllegalArgumentException("Saved chat log not found");
        }
    }

    public ChatbotSessionUUIDDto getChatbotChatUUID(String chatbotUUID) {
        ChatbotLogSet logSet = chatbotLogSetRepository.findById(chatbotUUID).orElse(null);
        ChatbotSessionUUIDDto chatbotSessionUUIDDto = new ChatbotSessionUUIDDto();
        if(logSet != null)
            chatbotSessionUUIDDto.setChatbotChatUUID(logSet.getChatbotChatUUID());
        return chatbotSessionUUIDDto;
    }

    public void deleteChatLog(String chatbotChatUUID) {
        Optional<SavedChatLogSet> optionalSavedChatLogSet = savedChatLogSetRepository.findById(chatbotChatUUID);
        if (optionalSavedChatLogSet.isPresent()) {
            savedChatLogSetRepository.deleteById(chatbotChatUUID);
            log.info("Deleted chat log with UUID: {}", chatbotChatUUID);
        } else {
            log.error("Chat log with UUID {} not found", chatbotChatUUID);
            throw new IllegalArgumentException("Chat log not found");
        }
    }
}
