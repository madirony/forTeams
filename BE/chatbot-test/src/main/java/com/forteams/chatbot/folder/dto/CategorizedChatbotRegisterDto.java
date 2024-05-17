package com.forteams.chatbot.folder.dto;

import lombok.Data;

@Data
public class CategorizedChatbotRegisterDto {

    private Long folderId;
    private String chatbotUuid;
    private String chatbotTitle;
}
