package com.forteams.openchat.chat.entity;

import com.forteams.openchat.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Document
@Getter
@NoArgsConstructor
public class OpenChat implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String senderUUID;
    private String message;
    private String messageUUID;
    private String replyMsgUUID;
    private String replyTo;
    private String removeCheck;
    private String createdAt;
    private String updatedAt;

    public OpenChat(String senderUUID, String message, String messageUUID, String replyMsgUUID, String replyTo, String removeCheck, String createdAt, String updatedAt) {
        this.senderUUID = senderUUID;
        this.message = message;
        this.messageUUID = messageUUID;
        this.replyMsgUUID = replyMsgUUID;
        this.replyTo = replyTo;
        this.removeCheck = removeCheck;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
