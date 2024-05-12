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
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @OneToOne
    @JoinColumn(name = "ms_uuid", referencedColumnName = "ms_uuid")
    private MsUserEntity msUserEntity;

    @Column(name = "user_nickname")
    private String userNickname; //추후에 인디언식

    @Column(name="user_dept")
    private String userDept; //부서

    @Column(name = "user_role")
    private String userRole; // USER만!

//    public UserEntity (String userDept) {
//        this.userDept = userDept;
//        this.userRole = "ROLE_USER";
//    }

//    public UserEntity (String msUuid, String userDept) {
//        this.msUserEntity = msUuid;
//        this.userDept = userDept;
//        this.userRole = "ROLE_USER";
//    }
}
