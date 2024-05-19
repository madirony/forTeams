package com.forteams.chatbot.chat.dto;

import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
public class MessageRequest {
    private MessageUser user;
    private Message[] messages;

    public MessageRequest(MessageUser user, Message[] messages) {
        this.user = user;
        this.messages = messages;
    }

    // getter와 setter 메서드 필요
}
