package com.forteams.auth.repository;

import com.forteams.auth.entity.MsUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MsUserRepository extends JpaRepository<MsUserEntity, Long> {

    MsUserEntity findByMsUuid(String msUuid);

    Optional<MsUserEntity> findByMicrosoftId(String microsoftId);
}