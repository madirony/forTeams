package com.forteams.chatbot.chat.repository;

import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatbotLogSetRepository extends MongoRepository<ChatbotLogSet, String> {
    Optional<ChatbotLogSet> findByChatbotChatUUID(String chatbotChatUUID);
}
