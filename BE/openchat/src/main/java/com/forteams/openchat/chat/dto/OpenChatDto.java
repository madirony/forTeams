package com.forteams.openchat.chat.dto;

import com.forteams.openchat.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpenChatDto extends BaseEntity {
    private String senderUUID;
    private String message;
    private String messageUUID;
    private String nickname;  // 닉네임 필드 추가
    private String replyMsgUUID;
    private String replyTo;
    private String removeCheck;

    @Override
    public String toString() {
        return senderUUID + " " + message + " " + messageUUID;
    }
}
