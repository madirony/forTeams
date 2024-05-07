"use client";
import React, { useState } from "react";
import styles from "styles/page/loginInfo.module.css";
import GradientButton from "component/gradientButton";

export default function LoginInfo() {
  const handlePurpleButtonClick = () => {
    console.log("완료 버튼 클릭!");
    // 여기에 수행할 작업 추가
  };

  const handleGrayButtonClick = () => {
    console.log("취소 버튼 클릭!");
    // 여기에 수행할 작업 추가
  };
  return (
    <div className={styles.container}>
      <p className={styles.text1}>사용자 정보</p>
      <div className={styles.inputContainer}>
        <p className={styles.text2}>이름</p>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.inputContainer}>
        <p className={styles.text2}>부서</p>
        <input className={styles.input} type="text" />
      </div>

      <GradientButton
        w={"50vw"}
        mode={"TWO_BUTTONS"}
        onGrayButtonClick={handleGrayButtonClick}
        onPurpleButtonClick={handlePurpleButtonClick}
      />
    </div>
  );
}
