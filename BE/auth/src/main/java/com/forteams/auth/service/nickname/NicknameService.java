package com.forteams.auth.service.nickname;

public interface NicknameService {
    //처음에만 실행
    void init();

    String assignNickname();

    //회원 탈퇴한다면, 실행
    void returnNicknameToPool(String nickname);
}
