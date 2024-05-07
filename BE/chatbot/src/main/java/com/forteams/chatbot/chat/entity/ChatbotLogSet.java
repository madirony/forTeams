package com.forteams.chatbot.chat.entity;

import com.forteams.chatbot.chat.dto.ChatbotDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Document(collection = "chatLogs")
public class ChatbotLogSet {
    // Getters and Setters
    @Id
    private String userUUID;
    private String chatbotChatUUID;
    private List<ChatbotDto> chatLogs = new ArrayList<>();

    public void addChatLogEntry(ChatbotDto entry) {
        this.chatLogs.add(entry);
    }
}
