package com.forteams.chatbot.chat.dto;

import com.forteams.chatbot.common.BaseEntity;
import com.forteams.chatbot.common.ChatbotBaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatbotDto extends ChatbotBaseEntity {
    String type; //recommend, ask, stream
    String sender; //true(or USER) (me), false(or BOT) (bot)
    String chatUUID; // ask id = reply id
    String msg;

    @Override
    public String toString() {
        return "type : " + type + " sender : " + sender + " msg" + msg;
    }
}
