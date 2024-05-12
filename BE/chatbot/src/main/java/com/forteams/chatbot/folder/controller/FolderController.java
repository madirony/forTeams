package com.forteams.chatbot.folder.controller;

import com.forteams.chatbot.folder.dto.FolderResponseDto;
import com.forteams.chatbot.folder.dto.FolderUpdateDto;
import com.forteams.chatbot.folder.service.FolderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/api/v1/chatbot/folder")
@AllArgsConstructor
public class FolderController {

    private final FolderService folderService;


    @PostMapping
    public ResponseEntity<Void> postFolder(@RequestHeader("msUuid") String msUuid, @RequestBody String folderName){
        try{
            folderService.createFolder(msUuid,folderName);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping
    public ResponseEntity<List<FolderResponseDto>> getFolders(@RequestHeader("msUuid") String msUuid){
        try{
            List<FolderResponseDto> list = folderService.getFolders(msUuid);
            return ResponseEntity.ok(list);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/{folderId}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long folderId, @RequestHeader("msUuid") String msUuid){
        try{
            folderService.removeFolder(folderId,msUuid);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @PutMapping
    public ResponseEntity<Void> putFolder(@RequestBody FolderUpdateDto folderUpdateDto, @RequestHeader("msUuid") String msUuid){
        try{
            folderService.updateFolder(folderUpdateDto, msUuid);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
