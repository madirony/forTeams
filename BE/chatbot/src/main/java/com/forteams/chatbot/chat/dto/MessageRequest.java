package com.forteams.chatbot.chat.dto;

import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
public class MessageRequest {
    private Message[] messages;

    public MessageRequest(Message[] messages) {
        this.messages = messages;
    }

    // getter와 setter 메서드 필요
}
