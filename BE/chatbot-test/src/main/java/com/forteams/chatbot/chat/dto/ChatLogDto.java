package com.forteams.chatbot.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatLogDto {
    private String chatbotChatUUID;
    private List<ChatbotDto> chatLogs;
}
