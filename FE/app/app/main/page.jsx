"use client";

import styles from "styles/page/main.module.css";
import GetWindowSize from "util/getWindowSize";
import MenuBar from "component/menuBar.jsx";
import MainSwiper from "template/main/mainSwiper";
import ChatMain from "template/chat/chatMain";
import RecoFunctionMain from "template/recoFunction/recoFunctionMain";
import ChatBotMain from "template/chatBot/chatBotMain";
import LocalStorage from "util/localStorage";
import { useEffect, useState } from "react";

export default function Main() {
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 윈도우 가로길이를 가져오기
  const { width } = GetWindowSize();

  return (
    <div className={styles.root}>
      <MenuBar
        userNickname={userNickname}
        userDept={userDept}
        userId={userId}
      />

      {width <= 500 ? (
        // 반응형-중간
        <div className={styles.swiperPage}>
          <MainSwiper />
        </div>
      ) : (
        // 반응형-데스크탑
        <div className={styles.largePage}>
          <div className={styles.sideWrapper}>
            <RecoFunctionMain />
            <ChatMain />
          </div>
          <div className={styles.mainWrapper}>
            <ChatBotMain />
          </div>
        </div>
      )}
    </div>
  );
}
