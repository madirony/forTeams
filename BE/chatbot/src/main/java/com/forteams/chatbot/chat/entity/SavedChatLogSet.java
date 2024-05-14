package com.forteams.chatbot.chat.entity;

import com.forteams.chatbot.chat.dto.ChatbotDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "savedChats")
public class SavedChatLogSet {
    private String userUUID;
    @Id
    private String chatbotChatUUID;
    private String chatTitle;
    private String createdAt;
    private String shareFlag;
    private List<ChatbotDto> chatLogs = new ArrayList<>();

    public void addChatLogEntry(ChatbotDto entry) {
        this.chatLogs.add(entry);
    }
}
