package com.forteams.chatbot.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatbotDto {
    String type; //recommend, ask, stream
    boolean sender; //true (me), false(bot)
    String msg;

    @Override
    public String toString() {
        return "type : " + type + " sender : " + sender + " msg" + msg;
    }
}
