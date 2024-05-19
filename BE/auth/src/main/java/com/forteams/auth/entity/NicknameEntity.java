package com.forteams.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "nicknames")
public class NicknameEntity {

    @Id
    private String nickname;

    @Column(name = "is_assigned")
    private boolean isAssigned; //첫 생성 시 false로 고정

    public NicknameEntity (String nickname) {
        this.nickname = nickname;
        this.isAssigned = false;
    }

}
