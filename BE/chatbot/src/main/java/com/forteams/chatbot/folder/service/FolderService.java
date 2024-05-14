package com.forteams.chatbot.folder.service;

import com.forteams.chatbot.folder.dto.*;
import com.forteams.chatbot.folder.entity.CategorizedChatbot;
import com.forteams.chatbot.folder.entity.Folder;
import com.forteams.chatbot.folder.repository.CategorizedChatbotRepository;
import com.forteams.chatbot.folder.repository.FolderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;
    private final CategorizedChatbotRepository categorizedChatbotRepository;

    public void createFolder(String msUuid, String folderName){
        Folder folder = Folder.builder()
                .name(folderName)
                .msUuid(msUuid)
                .build();
        folderRepository.save(folder);
    }


    public List<FolderResponseDto> getFolders(String msUuid) {
        return folderRepository.findAllByUserId(msUuid);
//        return folderRepository.findAll();
    }

    public void removeFolder(Long folderId, String msUuid) {
        Folder folder = getFolderAndValidate(folderId,msUuid);

        folderRepository.delete(folder);
    }

    public void updateFolder(FolderUpdateDto folderUpdateDto, String msUuid) {
        Folder folder = getFolderAndValidate(folderUpdateDto.getFolderId(),msUuid);

        folder.setName(folderUpdateDto.getFolderName());
        folderRepository.save(folder);
    }


    private Folder getFolderAndValidate(Long folderId, String msUuid) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new EntityNotFoundException("Folder not found with ID: " + folderId));

        if (!folder.getMsUuid().equals(msUuid)) {
            throw new SecurityException("Unauthorized attempt to access folder");
        }

        return folder;
    }

    public void createCategorizedChatbot(CategorizedChatbotRegisterDto registerDto){
        Folder folder = folderRepository.findById(registerDto.getFolderId()).orElseThrow();
        CategorizedChatbot cate = CategorizedChatbot.builder()
                .chatbotUuid(registerDto.getChatbotUuid())
                .chatbotTitle(registerDto.getChatbotTitle())
                .folder(folder)
                .build();
        categorizedChatbotRepository.save(cate);
    }

    public List<CategorizedChatbotResponseDto> getCategorizedChatbotsByFolderId(Long folderId) {
        return categorizedChatbotRepository.findAllByFolderId(folderId);
//        return folderRepository.findAll();
    }
}
