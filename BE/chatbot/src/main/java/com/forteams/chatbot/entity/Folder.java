package com.forteams.chatbot.entity;

import com.forteams.chatbot.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Folders")
@NoArgsConstructor
@Getter
public class Folder extends BaseEntity {
    @Id
    private Long id;

    @Column(name = "folder_name")
    private String name;
}
