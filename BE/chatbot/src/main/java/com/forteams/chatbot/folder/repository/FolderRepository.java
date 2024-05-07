package com.forteams.chatbot.folder.repository;

import com.forteams.chatbot.folder.dto.FolderResponseDto;
import com.forteams.chatbot.folder.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    @Query("select new com.forteams.chatbot.folder.dto.FolderResponseDto(" +
            "f.id, f.name) " +
            "from Folder f " +
            "where f.user.id = :userId")
    List<FolderResponseDto> findAllByUserId(@Param("userId") String userId);
}
