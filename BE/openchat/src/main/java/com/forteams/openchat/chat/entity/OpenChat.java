package com.forteams.openchat.chat.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class OpenChat {
    @Id
    private String id;
    private String senderUUID;
    private String message;
    private String messageUUID;
    private String replyMsgUUID;
    private String replyTo;
    private String removeCheck;

    public OpenChat(String senderUUID, String message, String messageUUID, String replyMsgUUID, String replyTo, String removeCheck) {
        this.senderUUID = senderUUID;
        this.message = message;
        this.messageUUID = messageUUID;
        this.replyMsgUUID = replyMsgUUID;
        this.replyTo = replyTo;
        this.removeCheck = removeCheck;
    }
}
