package com.forteams.chatbot.folder.controller;

import com.forteams.chatbot.folder.dto.FolderResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping( "/api/v1/token-test")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000, https://forteams.co.kr")
public class TokenTestController {

    @GetMapping
    public ResponseEntity<String> getMsUuid(@RequestHeader("msUuid") String msUuid){
        try{
            log.info("***************************\tgetMsUuid 도착\t***************************");
            log.info(msUuid);

            return ResponseEntity.ok(msUuid);
        }catch (Exception e){
            log.info(">>>>>"+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
