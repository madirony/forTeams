package com.forteams.chatbot.controller;

import com.forteams.chatbot.dto.FolderRegisterDto;
import com.forteams.chatbot.service.FolderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/chatbot/folder")
@AllArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @PostMapping("/test")
    public ResponseEntity<String> postFolder(@RequestBody FolderRegisterDto folderRegisterDto){
        folderService.createFolder(folderRegisterDto);
        return ResponseEntity.ok("히히");
    }
}
