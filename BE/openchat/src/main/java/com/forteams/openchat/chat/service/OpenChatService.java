package com.forteams.openchat.chat.service;

import com.forteams.openchat.chat.dto.OpenChatDto;
import com.forteams.openchat.chat.entity.OpenChat;
import com.forteams.openchat.chat.repository.OpenChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.*;
import java.util.ArrayList;
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
        List<OpenChat> chatsFromDb = openChatRepository.findAll();
        List<OpenChatDto> result = chatsFromDb.stream().map(this::convertToDto).collect(Collectors.toList());
        result.addAll(getChatsFromRedis());
        return result;
    }

    public List<OpenChatDto> getTodayChats() {
        ZoneId seoulZoneId = ZoneId.of("Asia/Seoul");
        ZoneId dbZoneId = ZoneOffset.UTC;  // 데이터베이스 시간대 설정

        // 서울 시간대 기준 오늘의 시작과 끝
        LocalDateTime startOfDay = LocalDate.now(seoulZoneId).atStartOfDay();
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(seoulZoneId), LocalTime.MAX);

        // 서울 시간대에서 UTC로 변환
        LocalDateTime startOfTodayInUTC = startOfDay.atZone(seoulZoneId).withZoneSameInstant(dbZoneId).toLocalDateTime();
        LocalDateTime endOfTodayInUTC = endOfDay.atZone(seoulZoneId).withZoneSameInstant(dbZoneId).toLocalDateTime();

        // 데이터베이스 조회
        List<OpenChat> chatsFromDb = openChatRepository.findByCreatedAtBetween(String.valueOf(startOfTodayInUTC), String.valueOf(endOfTodayInUTC));
        List<OpenChatDto> result = chatsFromDb.stream().map(this::convertToDto).collect(Collectors.toList());
        result.addAll(getChatsFromRedis());
        return result;
    }

    private List<OpenChatDto> getChatsFromRedis() {
        List<?> rawMessages = redisTemplate.opsForList().range("chatMessages", 0, -1);
        if (rawMessages == null) {
            return new ArrayList<>();
        }
        return rawMessages.stream()
                .filter(Objects::nonNull)
                .filter(o -> o instanceof OpenChatDto)
                .map(o -> (OpenChatDto) o)
                .collect(Collectors.toList());
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

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
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
