package com.forteams.chatbot.chat.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class StreamStatusService {
    private final ConcurrentHashMap<String, Boolean> streamStatusMap = new ConcurrentHashMap<>();

    public void startStream(String chatbotUUID) {
        streamStatusMap.put(chatbotUUID, true);
    }

    public void stopStream(String chatbotUUID) {
        streamStatusMap.put(chatbotUUID, false);
    }

    public boolean isStreamActive(String chatbotUUID) {
        return streamStatusMap.getOrDefault(chatbotUUID, false);
    }

    public void removeStream(String chatbotUUID) {
        streamStatusMap.remove(chatbotUUID);
    }
}
