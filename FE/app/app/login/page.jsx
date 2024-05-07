"use client"
import React, { useState } from "react";
import styles from "styles/page/login.module.css";
import GradientButton from "component/gradientButton";
import ModalSave from "component/modalSave";

export default function LoginMain() {

  const handlePurpleButtonClick = () => {
    console.log("보라색 버튼 클릭!");
    // 여기에 수행할 작업 추가
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
        <GradientButton w={"50vw"} mode={"ONE_BUTTON"} purpleButtonText={"내 Teams계정으로 로그인"} onPurpleButtonClick={handlePurpleButtonClick}/>
        </div>
      </div>
    </div>
)
}
