"use client";

import { useState } from "react";
import styles from "styles/page/mypage.module.css";
import MenuBar from "component/menuBar.jsx";
import MypageHamburger from "component/mypageHamburger";
import MypageInfo from "template/mypage/mypageInfo";
import MypageAllLogs from "template/mypage/mypageAllLogs";

export default function Mypage() {
  // Hamburger Menu 선택을 위한 변수
  const [selectedPage, setSelectedPage] = useState("info");

  return (
    <div className={styles.root}>
      <MenuBar />
      <div className={styles.content}>
        <div className={styles.sideWrapper}>
          <MypageHamburger
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
        <div className={styles.mainWrapper}>
          {selectedPage === "info" && <MypageInfo />}
          {selectedPage === "allLogs" && <MypageAllLogs />}
          {/* {selectedPage === 'myLogs' && <>} */}
        </div>
      </div>
    </div>
  );
}
