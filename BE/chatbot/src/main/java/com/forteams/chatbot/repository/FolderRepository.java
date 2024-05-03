package com.forteams.chatbot.repository;

import com.forteams.chatbot.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {
}
