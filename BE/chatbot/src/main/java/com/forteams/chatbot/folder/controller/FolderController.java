package com.forteams.chatbot.folder.controller;

import com.forteams.chatbot.folder.dto.CategorizedChatbotRegisterDto;
import com.forteams.chatbot.folder.dto.CategorizedChatbotResponseDto;
import com.forteams.chatbot.folder.dto.FolderResponseDto;
import com.forteams.chatbot.folder.dto.FolderUpdateDto;
import com.forteams.chatbot.folder.service.FolderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/api/v1/folder")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/categorized-chatbot")
        public ResponseEntity<Void> postChatbotInFolder(@RequestBody CategorizedChatbotRegisterDto registerDto){
        try{
            folderService.createCategorizedChatbot(registerDto);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/categorized-catbot")
    public ResponseEntity<List<CategorizedChatbotResponseDto>> getCategorizedChatbotsByFolderId(@RequestBody Long folderId){
        try{
            List<CategorizedChatbotResponseDto> list = folderService.getCategorizedChatbotsByFolderId(folderId);
            return ResponseEntity.ok(list);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
