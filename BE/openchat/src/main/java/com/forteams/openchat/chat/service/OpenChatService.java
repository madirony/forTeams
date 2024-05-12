package com.forteams.openchat.chat.service;

import com.forteams.openchat.chat.dto.OpenChatDto;
import com.forteams.openchat.chat.entity.OpenChat;
import com.forteams.openchat.chat.repository.OpenChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenChatService {
    private final OpenChatRepository openChatRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public List<OpenChatDto> getAllChats() {
        List<OpenChat> chats = openChatRepository.findAll();
        return chats.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<OpenChatDto> getTodayChats() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        List<OpenChat> chats = openChatRepository.findByCreatedAtBetween(String.valueOf(startOfDay), String.valueOf(endOfDay));
        return chats.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private OpenChatDto convertToDto(OpenChat chat) {
        OpenChatDto dto = new OpenChatDto();
        dto.setSenderUUID(chat.getSenderUUID());
        dto.setMessage(chat.getMessage());
        dto.setMessageUUID(chat.getMessageUUID());
        dto.setReplyMsgUUID(chat.getReplyMsgUUID());
        dto.setReplyTo(chat.getReplyTo());
        dto.setRemoveCheck(chat.getRemoveCheck());
        dto.setCreatedAt(chat.getCreatedAt());
        dto.setUpdatedAt(chat.getUpdatedAt());
        return dto;
    }

    private OpenChat convertToEntity(OpenChatDto dto) {
        return new OpenChat(
                dto.getSenderUUID(),
                dto.getMessage(),
                dto.getMessageUUID(),
                dto.getReplyMsgUUID(),
                dto.getReplyTo(),
                dto.getRemoveCheck(),
                dto.getCreatedAt(),
                dto.getUpdatedAt()
        );
    }

    public void processReceivedMessage(OpenChatDto dto) {
        dto.setRemoveCheck("false");

        LocalDateTime now = LocalDateTime.now();
        dto.setCreatedAt(String.valueOf(now));
        dto.setUpdatedAt(String.valueOf(now));

        String uniqueMessageUUID = UUID.randomUUID().toString();
        dto.setMessageUUID(uniqueMessageUUID);

        redisTemplate.opsForList().rightPush("chatMessages", dto);
    }

    @Scheduled(fixedRate = 10000)
    public void saveMessagesToMongoDB() {
        List<?> rawMessages = redisTemplate.opsForList().range("chatMessages", 0, -1);
        if (rawMessages == null) {
            return;
        }

        List<OpenChatDto> dtos = rawMessages.stream()
                .filter(Objects::nonNull)
                .filter(o -> o instanceof OpenChatDto)
                .map(o -> (OpenChatDto) o)
                .collect(Collectors.toList());

        List<OpenChat> chats = dtos.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());

        if (!chats.isEmpty()) {
            openChatRepository.saveAll(chats);
            redisTemplate.delete("chatMessages");
            log.info("Messages saved to MongoDB and cleared from Redis");
        }
    }

}
