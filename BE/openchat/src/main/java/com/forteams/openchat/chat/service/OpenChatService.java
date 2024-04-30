package com.forteams.openchat.chat.service;

import com.forteams.openchat.chat.dto.OpenChatDto;
import com.forteams.openchat.chat.entity.OpenChat;
import com.forteams.openchat.chat.repository.OpenChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenChatService {
    private final OpenChatRepository openChatRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    // DTO에서 엔티티로 변환
    private OpenChat convertToEntity(OpenChatDto dto) {
        return new OpenChat(
                dto.getSenderUUID(),
                dto.getMessage(),
                dto.getMessageUUID(),
                dto.getReplyMsgUUID(),
                dto.getReplyTo(),
                dto.getRemoveCheck()
        );
    }

    // 메시지 처리 및 Redis에 저장
    public void processReceivedMessage(OpenChatDto dto) {
        OpenChat chat = convertToEntity(dto);
        openChatRepository.save(chat); // MongoDB에 즉시 저장
        redisTemplate.opsForList().rightPush("chatMessages", chat); // Redis에 저장
    }

    // 주기적으로 MongoDB에 저장
    @Scheduled(fixedRate = 3600000)
    public void saveMessagesToMongoDB() {
        List<Object> messages = redisTemplate.opsForList().range("chatMessages", 0, -1);
        List<OpenChat> chats = messages.stream()
                .map(o -> convertToEntity((OpenChatDto) o))
                .collect(Collectors.toList());
        if (!chats.isEmpty()) {
            openChatRepository.saveAll(chats);
            redisTemplate.delete("chatMessages"); // Redis 데이터 삭제
            log.info("Messages saved to MongoDB and cleared from Redis");
        }
    }
}
