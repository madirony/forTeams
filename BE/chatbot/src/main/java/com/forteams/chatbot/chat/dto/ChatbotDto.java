package com.forteams.chatbot.chat.dto;

import com.forteams.chatbot.common.BaseEntity;
import com.forteams.chatbot.common.ChatbotBaseEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatbotDto extends ChatbotBaseEntity {
    String type; //recommend, ask, stream
    boolean sender; //true (me), false(bot)
    String chatUUID; // ask id = reply id
    String msg;

    @Override
    public String toString() {
        return "type : " + type + " sender : " + sender + " msg" + msg;
    }
}
