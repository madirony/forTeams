package com.forteams.chatbot.folder.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class FolderUpdateDto {

    private Long folderId;
    private String folderName;
}
