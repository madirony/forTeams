package com.forteams.openchat.chat.repository;

import com.forteams.openchat.chat.entity.OpenChat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OpenChatRepository extends MongoRepository<OpenChat, String> {
}
