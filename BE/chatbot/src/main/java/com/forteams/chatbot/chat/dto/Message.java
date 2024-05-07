package com.forteams.chatbot.chat.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Message {
    private String role;
    private String content;

    public Message(String role, String content) {
        this.role = role;
        this.content = content;
    }

    // getter와 setter 메서드 필요
}
