package com.forteams.chatbot.folder.service;

import com.forteams.chatbot.folder.dto.FolderRegisterDto;
import com.forteams.chatbot.folder.dto.FolderResponseDto;
import com.forteams.chatbot.folder.dto.FolderUpdateDto;
import com.forteams.chatbot.folder.entity.Folder;
import com.forteams.chatbot.user.entity.User;
import com.forteams.chatbot.folder.repository.FolderRepository;
import com.forteams.chatbot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    public void createFolder(FolderRegisterDto folderRegisterDto){
        User user = userRepository.findById(folderRegisterDto.getUserId()).orElseThrow();
        Folder folder = Folder.builder()
                .name(folderRegisterDto.getFolderName())
                .user(user)
                .build();
        folderRepository.save(folder);
    }

    public List<FolderResponseDto> getFolders(String userId) {
        return folderRepository.findAllByUserId(userId);
//        return folderRepository.findAll();
    }

    public void removeFolder(Long folderId) {
        Folder folder = folderRepository.findById(folderId).orElseThrow();
        folderRepository.delete(folder);
    }

    public void updateFolder(FolderUpdateDto folderUpdateDto) {
        Folder folder = folderRepository.findById(folderUpdateDto.getFolderId()).orElseThrow();
        folder.setName(folderUpdateDto.getFolderName());
        folderRepository.save(folder);
    }
}
