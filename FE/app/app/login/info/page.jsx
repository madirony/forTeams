"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "styles/page/loginInfo.module.css";
import GradientButton from "component/gradientButton";
import LoginDropdownInput from "component/loginDropdownInput";

// API import
import { addLoginInfo } from "../../../apis/login";

export default function LoginInfo() {
  const router = useRouter();

  // 드롭다운 정의 ===========================================================
  const [selectedOption, setSelectedOption] = useState({});
  // console.log("[LoginInfo] 부서 선택 바뀜: ", selectedOption.name);

  // 버튼 핸들러 =============================================================
  const handlePurpleButtonClick = () => {
    const userDept = selectedOption.name;
    console.log("[LoginInfo] 1. 유저가 선택한 부서 이름 알기", userDept);
    // 로그인 추가 정보 입력 API 요청 보내기
    addLoginInfo(userDept).then((response) => {
      console.log("[LoginInfo] 2. 부서 이름 보내서 토큰 생성", response);

      // 메인 페이지로 리다이렉트
      console.log("[LoginInfo] 3. 메인 페이지로 리다이렉트");
      router.push("/");
    });
  };

  const handleGrayButtonClick = () => {
    router.back();
    // console.log("[LoginInfo] 취소 버튼 클릭!");
  };

  return (
    <div className={styles.container}>
      <p className={styles.modalTitle}>사용자 정보</p>
      <div className={styles.inputContainer}>
        <p className={styles.inputTitle}>닉네임</p>
        <input
          className={styles.input}
          type="text"
          value={"무지무지"}
          readonly
        />
      </div>

      <div className={styles.inputContainer}>
        <p className={styles.inputTitle}>부서</p>
        <LoginDropdownInput
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <GradientButton
        w={"100%"}
        h={"35px"}
        mode={"TWO_BUTTONS"}
        onGrayButtonClick={handleGrayButtonClick}
        onPurpleButtonClick={handlePurpleButtonClick}
      />
    </div>
  );
}
