package com.forteams.chatbot.folder.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categorized_chatbots")
@NoArgsConstructor
@Setter
@Getter
public class CategorizedChatbot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categorized_chatbot_id")
    private Long id;

    @Column(name = "chatbot_uuid")
    String chatbotUuid;

    @Column(name = "chatbot_title")
    String chatbotTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    Folder folder;

    @Builder
    public CategorizedChatbot(String chatbotUuid, String chatbotTitle, Folder folder){
        this.chatbotUuid = chatbotUuid;
        this.chatbotTitle = chatbotTitle;
        this.folder = folder;
    }

}
