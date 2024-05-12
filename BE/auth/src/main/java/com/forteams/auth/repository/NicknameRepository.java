package com.forteams.auth.repository;


import com.forteams.auth.entity.NicknameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NicknameRepository extends JpaRepository<NicknameEntity, String> {
}
