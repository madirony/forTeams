package com.forteams.chatbot.folder.repository;

import com.forteams.chatbot.folder.dto.CategorizedChatbotResponseDto;
import com.forteams.chatbot.folder.entity.CategorizedChatbot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategorizedChatbotRepository extends JpaRepository<CategorizedChatbot,String> {

    @Query("select new com.forteams.chatbot.folder.dto.CategorizedChatbotResponseDto(" +
            "cc.chatbotUuid, cc.chatbotTitle) " +
            "from CategorizedChatbot cc " +
            "where cc.folder.id = :folderId")
    List<CategorizedChatbotResponseDto> findAllByFolderId(@Param("folderId") Long folderId);

    Optional<CategorizedChatbot> findByChatbotUuid(String chatbotUuid);
}
