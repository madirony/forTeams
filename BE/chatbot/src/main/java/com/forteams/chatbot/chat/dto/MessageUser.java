package com.forteams.chatbot.chat.dto;

import lombok.Data;

@Data
public class MessageUser {
    private String name;
    private String uuid;
    private String dept;

    public MessageUser(String name, String uuid, String dept) {
        this.name = name;
        this.uuid = uuid;
        this.dept = dept;
    }
}
