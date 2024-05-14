package com.forteams.chatbot.folder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class CategorizedChatbotResponseDto {

    private String chatbotUuid;
    private String chatbotTitle;
}
