package com.forteams.auth.repository;

import com.forteams.auth.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByMsUserEntity_MsUuid(String msUuid);

//    UserEntity findByMsUuid(String msUuid);

//    @Query("SELECT u " +
//            "FROM UserEntity u" +
//            " WHERE u.msUserEntity.msPk = :msPk")
//    Optional<UserEntity> findByMsPk(@Param("msPk") Long msPk);
}
