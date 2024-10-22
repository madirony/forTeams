// LoginMain은 MS 로그인 웹으로 넘어가는 역할만 수행

"use client";

import React from "react";
import styles from "styles/page/login.module.css";
import GradientButton from "component/gradientButton";

export default function LoginMain() {
  // MS 로그인 웹으로 넘어가는 함수
  const handlePurpleButtonClick = () => {
    window.location.href = `https://forteams.co.kr/oauth2/authorization/microsoft`;
    // window.location.href = `http://localhost:8443/oauth2/authorization/microsoft`;
  };

  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src="image/background.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <p className={styles.text1}>Ms Teams</p>
        <p className={styles.text2}>어디서나 간편하게</p>
        <p className={styles.text1}>사용해보세요</p>
        <div className={styles.buttonContainer}>
          <GradientButton
            w={"50vw"}
            mode={"ONE_BUTTON"}
            purpleButtonText={"내 Teams계정으로 로그인"}
            onPurpleButtonClick={handlePurpleButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
