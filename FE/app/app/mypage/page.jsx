"use client";

import { useState } from "react";
import styles from "styles/page/mypage.module.css";
import MenuBar from "component/menuBar.jsx";
import MypageHamburgerWeb from "component/mypageHamburgerWeb";
import MypageHamburgerMobile from "component/mypageHamburgerMobile";
import MypageInfo from "template/mypage/mypageInfo";
import MypageAllLogs from "template/mypage/mypageAllLogs";
import MypageMyLogs from "template/mypage/mypageMyLogs";
import ModalShare from "component/modalShare";
import ModalSave from "component/modalSave";

export default function Mypage() {
  // Local에서 사용자 정보를 조회해오기
  const userName = "이수민";
  const userDept = "철강영업팀";
  const userId = 66;

  //
  const [selectedChatbotId, setSelectedChatbotId] = useState(null);

  // Hamburger Menu 선택을 위한 변수
  const [selectedPage, setSelectedPage] = useState("info");

  // 모달 오픈 여부를 저장할 변수
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);

  // 클릭시 모달 오픈 여부를 변경하는 함수
  const openModalShare = (logId) => {
    // console.log("챗봇아이아이ㅏㄹ이랑란ㅇ", logId);
    setSelectedChatbotId(logId);
    // console.log("1.selectedchatbot", selectedChatbotId);
    setShowModalShare(!showModalShare);
  };
  const openModalSave = () => {
    setShowModalSave(!showModalSave);
  };
  // console.log("2.selectedchatbot", selectedChatbotId);
  return (
    <div className={styles.root}>
      <MenuBar userName={userName} userDept={userDept} userId={userId} />
      <div className={styles.content}>
        <div className={styles.hamburgerWeb}>
          <MypageHamburgerWeb
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
        <div className={styles.mainWrapper}>
          <div className={styles.hamburgerMobile}>
            <MypageHamburgerMobile
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>

          {/* 모달 띄우는 부분 */}
          {showModalShare && (
            <ModalShare
              chatbotid={selectedChatbotId}
              openModalShare={openModalShare}
            />
          )}
          {showModalSave && (
            <ModalSave chatbotid={123456} openModalSave={openModalSave} />
          )}

          {/* 햄버거 메뉴 선택하는 부분 */}
          <div className={styles.hamburgerContent}>
            {selectedPage === "info" && <MypageInfo />}
            {selectedPage === "allLogs" && (
              <MypageAllLogs
                openModalShare={openModalShare}
                openModalSave={openModalSave}
              />
            )}
            {selectedPage === "myLogs" && (
              <MypageMyLogs
                openModalShare={openModalShare}
                openModalSave={openModalSave}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
