package com.forteams.chatbot.folder.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class FolderUpdateDto {

    private Long folderId;
    private String folderName;
}
