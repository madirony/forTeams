"use client";

import { useState } from "react";
import styles from "styles/page/mypage.module.css";
import MenuBar from "component/menuBar.jsx";
import MypageHamburger from "component/mypageHamburger";
import MypageInfo from "template/mypage/mypageInfo";
import MypageAllLogs from "template/mypage/mypageAllLogs";
import MypageMyLogs from "template/mypage/mypageMyLogs";
import ModalShare from "component/modalShare";
import ModalSave from "component/modalSave";

export default function Mypage() {
  // Hamburger Menu 선택을 위한 변수
  const [selectedPage, setSelectedPage] = useState("info");

  // 모달 오픈 여부를 저장할 변수
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);

  // 클릭시 모달 오픈 여부를 변경하는 함수
  const openModalShare = () => {
    setShowModalShare(!showModalShare);
  };
  const openModalSave = () => {
    setShowModalSave(!showModalSave);
  };

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
          {showModalShare && (
            <ModalShare chatbotid={999999} openModalShare={openModalShare} />
          )}
          {showModalSave && (
            <ModalSave chatbotid={123456} openModalSave={openModalSave} />
          )}
          {selectedPage === "info" && <MypageInfo />}
          {selectedPage === "allLogs" && (
            <MypageAllLogs
              openModalShare={openModalShare}
              openModalSave={openModalSave}
            />
          )}
          {selectedPage === "myLogs" && <MypageMyLogs />}
        </div>
      </div>
    </div>
  );
}
