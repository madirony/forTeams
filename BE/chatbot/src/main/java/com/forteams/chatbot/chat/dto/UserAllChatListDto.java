package com.forteams.chatbot.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAllChatListDto {
    private String chatbotChatUUID;
    private String chatTitle;
    private String createdAt;
}
