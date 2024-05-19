package com.forteams.auth.service.nickname;

import com.forteams.auth.entity.NicknameEntity;
import com.forteams.auth.repository.NicknameRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NicknameServiceImpl implements NicknameService {
    private final NicknameRepository nicknameRepository;
    private final StringRedisTemplate redisTemplate;
    private static final String NICKNAME_SET_KEY = "available_nicknames";

    @PostConstruct
    public void init() {
        SetOperations<String, String> setOps = redisTemplate.opsForSet();
        if (setOps.size(NICKNAME_SET_KEY) == 0) {
            List<NicknameEntity> nicknames = nicknameRepository.findAll();
            for (NicknameEntity nickname : nicknames) {
                if (!nickname.isAssigned()) {
                    setOps.add(NICKNAME_SET_KEY, nickname.getNickname());
                }
            }
        }
    }

    @Transactional
    public String assignNickname() {
        String nickname = redisTemplate.opsForSet().pop(NICKNAME_SET_KEY);
        if (nickname != null) {
            NicknameEntity nick = nicknameRepository.findById(nickname).orElseThrow();
            nick.setAssigned(true);
            nicknameRepository.save(nick);
        }
        return nickname;
    }

    /**
     * 회원 탈퇴할 때,
     * 닉네임을 Redis의 Set에 다시 추가하고, 할당 상태를 업데이트하는 메소드
     * @param nickname 반환할 닉네임
     */
    @Transactional
    public void returnNicknameToPool(String nickname) {
        NicknameEntity nicknameEntity = nicknameRepository.findById(nickname)
                .orElseThrow(() -> new IllegalArgumentException("Invalid nickname: " + nickname));
        nicknameEntity.setAssigned(false);
        nicknameRepository.save(nicknameEntity);
        redisTemplate.opsForSet().add(NICKNAME_SET_KEY, nickname);
    }
    
}
