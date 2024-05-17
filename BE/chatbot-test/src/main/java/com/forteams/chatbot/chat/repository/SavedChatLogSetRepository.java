package com.forteams.chatbot.chat.repository;

import com.forteams.chatbot.chat.entity.SavedChatLogSet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SavedChatLogSetRepository extends MongoRepository<SavedChatLogSet, String> {
    List<SavedChatLogSet> findByUserUUID(String userUUID);
}
