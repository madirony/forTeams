package com.forteams.chatbot.folder.controller;

import com.forteams.chatbot.folder.dto.FolderListFetchDto;
import com.forteams.chatbot.folder.dto.FolderRegisterDto;
import com.forteams.chatbot.folder.dto.FolderResponseDto;
import com.forteams.chatbot.folder.dto.FolderUpdateDto;
import com.forteams.chatbot.folder.service.FolderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/api/chatbot/folder"))
@AllArgsConstructor
public class FolderController {

    private final FolderService folderService;



    @PostMapping("/")
    public ResponseEntity<Void> postFolder(@RequestBody FolderRegisterDto folderRegisterDto){
        try{
            folderService.createFolder(folderRegisterDto);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<FolderResponseDto>> getFolders(@RequestBody FolderListFetchDto folderListFetchDto){
        try{
            List<FolderResponseDto> list = folderService.getFolders(folderListFetchDto.getUserId());
            return ResponseEntity.ok(list);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/{folderId}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long folderId){
        try{
            folderService.removeFolder(folderId);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/")
    public ResponseEntity<Void> updateFolder(@PathVariable Long folderId){
        try{
            folderService.removeFolder(folderId);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping
    public ResponseEntity<Void> putFolder(@RequestBody FolderUpdateDto folderUpdateDto){
        try{
//            log.info(">>>"+scheduleUpdateDto.isActive()+","+scheduleUpdateDto.getScheduleId());
//            System.out.println(scheduleUpdateDto.isActive());
            folderService.updateFolder(folderUpdateDto);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
