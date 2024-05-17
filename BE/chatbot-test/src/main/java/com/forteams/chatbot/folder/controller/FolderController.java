package com.forteams.chatbot.folder.controller;

import com.forteams.chatbot.chat.dto.UserAllChatListDto;
import com.forteams.chatbot.folder.dto.CategorizedChatbotRegisterDto;
import com.forteams.chatbot.folder.dto.CategorizedChatbotResponseDto;
import com.forteams.chatbot.folder.dto.FolderResponseDto;
import com.forteams.chatbot.folder.dto.FolderUpdateDto;
import com.forteams.chatbot.folder.service.FolderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping( "/api/v2/folder")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000, https://forteams.co.kr")
public class FolderController {

    private final FolderService folderService;
//    private final String msUuid = "f1c2505e-3844-4984-ad16-495370d272ea";
    @PostMapping
    public ResponseEntity<Void> postFolder(@RequestHeader("msUuid") String msUuid, @RequestBody String folderName){
        try{
//            String msUuid = "1d0e5fae-f3de-4f5d-93f5-2f5d6e5da1b7";
            folderService.createFolder(msUuid,folderName);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping
    public ResponseEntity<List<FolderResponseDto>> getFolders(@RequestHeader("msUuid") String msUuid){
        try{
            log.info("getFolders 도착");
//            String msUuid = "1d0e5fae-f3de-4f5d-93f5-2f5d6e5da1b7";
            List<FolderResponseDto> list = folderService.getFolders(msUuid);
            return ResponseEntity.ok(list);
        }catch (Exception e){
            log.info(">>>>>"+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/{folderId}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long folderId, @RequestHeader("msUuid") String msUuid){
        try{
//            String msUuid = "1.d0e5fae-f3de-4f5d-93f5-2f5d6e5da1b7";
            folderService.removeFolder(folderId,msUuid);
            return ResponseEntity.ok(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @PutMapping
    public ResponseEntity<Void> putFolder(@RequestBody FolderUpdateDto folderUpdateDto, @RequestHeader("msUuid") String msUuid){
        try{
//            String msUuid = "1d0e5fae-f3de-4f5d-93f5-2f5d6e5da1b7";
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

    @GetMapping("/categorized-chatbot")
    public ResponseEntity<List<UserAllChatListDto>> getCategorizedChatbotsByFolderId(@RequestParam Long folderId){
        try{
            List<UserAllChatListDto> list = folderService.getCategorizedChatbotsByFolderId(folderId);
            return ResponseEntity.ok(list);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
