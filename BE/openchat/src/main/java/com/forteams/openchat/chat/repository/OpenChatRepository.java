package com.forteams.openchat.chat.repository;

import com.forteams.openchat.chat.entity.OpenChat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface OpenChatRepository extends MongoRepository<OpenChat, String> {
    @Query("{'createdAt' : {$gte: ?0, $lte: ?1}}")
    List<OpenChat> findByCreatedAtBetween(String startOfDay, String endOfDay);
}
