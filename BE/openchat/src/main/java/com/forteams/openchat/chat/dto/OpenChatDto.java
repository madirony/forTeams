package com.forteams.openchat.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpenChatDto {
    private String senderUUID;
    private String message;
    private String messageUUID;

    private String replyMsgUUID;
    private String replyTo;

    private String removeCheck;
}
