package com.forteams.chatbot.chat.repository;

import com.forteams.chatbot.chat.entity.ChatbotLogSet;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ChatbotLogSetRepository extends ReactiveMongoRepository<ChatbotLogSet, String> {
    Mono<ChatbotLogSet> findByChatbotChatUUID(String chatbotChatUUID);
}
