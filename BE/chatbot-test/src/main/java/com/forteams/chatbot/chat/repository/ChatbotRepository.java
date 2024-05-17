package com.forteams.chatbot.chat.repository;

import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatbotRepository extends MongoRepository<ChatbotLogSet, String> {
}
