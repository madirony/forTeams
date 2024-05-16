"use client";

// import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "styles/page/loginInfo.module.css";
import GradientButton from "component/gradientButton";
import LoginDropdownInput from "component/loginDropdownInput";
import { getCookies } from "util/getToken";

// API import
import { addLoginInfo } from "../../../apis/login";

export default function LoginInfo() {
  const router = useRouter();
  // 토큰 및 사용자 정보 읽어오기 =============================================
  // 쿠키에서 토큰을 읽어오는 함수

  // 사용자 이름, 부서 정보 저장하기
  // const [name, setName] = useState("");
  // const [department, setDepartment] = useState({});

  // 드롭다운 정의 ===========================================================
  const [selectedOption, setSelectedOption] = useState({});
  console.log("login/info 부서 선택 바뀜: ", selectedOption.name);

  // 버튼 핸들러 =============================================================
  const handlePurpleButtonClick = () => {
    const userDept = selectedOption.name;
    console.log("1. 유저가 선택한 부서 이름 알기", userDept);
    // 로그인 추가 정보 입력 API 요청 보내기
    addLoginInfo(userDept)
      .then((response) => {
        console.log("2. 부서 이름 ", response);
        // 메인 페이지로 리다이렉트
        // router.push("/login/info");

        // 완료 버튼 클릭!
        // 회원가입 완료 msUuid: c37afcd8-c1f4-42b7-9be8-ec2bf6d24622,
        // dept: undefined
      })
      .catch((error) => {
        console.log("login info 에서", error);
      });
  };

  const handleGrayButtonClick = () => {
    router.back();
    console.log("취소 버튼 클릭!");
    // 여기에 수행할 작업 추가
    // 로그인 페이지(이전 페이지)로 돌아가기
  };

  return (
    <div className={styles.container}>
      <p className={styles.modalTitle}>사용자 정보 0953</p>
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
