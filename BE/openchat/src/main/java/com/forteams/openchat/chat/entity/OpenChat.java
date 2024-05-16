package com.forteams.openchat.chat.entity;

import com.forteams.openchat.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;

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
    private String nickname;  // 닉네임 필드 추가
    private String replyMsgUUID;
    private String replyTo;
    private String removeCheck;
    private String createdAt;
    private String updatedAt;

    public OpenChat(String senderUUID, String message, String messageUUID, String nickname, String replyMsgUUID, String replyTo, String removeCheck, String createdAt, String updatedAt) {
        this.senderUUID = senderUUID;
        this.message = message;
        this.messageUUID = messageUUID;
        this.nickname = nickname;  // 닉네임 필드 초기화
        this.replyMsgUUID = replyMsgUUID;
        this.replyTo = replyTo;
        this.removeCheck = removeCheck;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
