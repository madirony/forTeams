package com.forteams.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ms_users")
public class MsUserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ms_pk")
    private Long msPk;

    @Column(name = "microsoft_id")
    private String microsoftId; //ms에 로그인하는 email -> 이걸 확인해서 없으면 회원가입 진행

    @Column(name = "ms_uuid", unique = true)
    private String msUuid = UUID.randomUUID().toString(); // UUID를 String으로 저장

    @Column(name = "user_name")
    private String userName; //이름 name으로 가져오기

    public MsUserEntity (String microsoftId, String userName) {
        this.microsoftId = microsoftId;
        this.userName = userName;
    }
}
