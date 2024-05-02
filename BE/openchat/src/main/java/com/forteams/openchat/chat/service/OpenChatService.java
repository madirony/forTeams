package com.forteams.openchat.chat.service;

import com.forteams.openchat.chat.dto.OpenChatDto;
import com.forteams.openchat.chat.entity.OpenChat;
import com.forteams.openchat.chat.repository.OpenChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenChatService {
    private final OpenChatRepository openChatRepository;
    private final RedisTemplate<String, Object> redisTemplate;

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
        LocalDateTime now = LocalDateTime.now();
        dto.setCreatedAt(String.valueOf(now));
        dto.setUpdatedAt(String.valueOf(now));
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
