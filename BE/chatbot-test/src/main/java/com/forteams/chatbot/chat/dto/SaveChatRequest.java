package com.forteams.chatbot.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveChatRequest {
    private String userUUID;
    private String chatUUID;
}
