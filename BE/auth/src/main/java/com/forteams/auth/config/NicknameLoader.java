package com.forteams.auth.config;

import com.forteams.auth.entity.NicknameEntity;
import com.forteams.auth.repository.NicknameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

/**
 * db에 닉네임 추가하기
 */

@Component
@RequiredArgsConstructor
public class NicknameLoader implements CommandLineRunner {

    private final NicknameRepository nicknameRepository;
    private static String NICKNAMES_FILE = "static/Unique_Nicknames.txt";

    @Override
    public void run(String... args) throws Exception {
        if (nicknameRepository.count() == 0) { // 닉네임 테이블이 비어있는지 확인
            Resource resource = new ClassPathResource(NICKNAMES_FILE);
            InputStream inputStream = resource.getInputStream();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
                List<NicknameEntity> nicknames = reader.lines()
                        .map(NicknameEntity::new)
                        .collect(Collectors.toList());
                nicknameRepository.saveAll(nicknames);
                System.out.println("닉네임 데이터 로드 완료.");
            }
        } else { // 테이블이 비어있지 않다면, 이미 닉네임 데이터가 추가된 것이므로 다시 실행하지 않게 방지! -> 시간이 너무 오래 걸림
            System.out.println("닉네임 데이터가 이미 로드되어 있습니다.");
        }
    }
}
