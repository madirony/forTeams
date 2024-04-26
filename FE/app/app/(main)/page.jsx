"use client";

import { useState } from "react";
import styles from "styles/main.module.css";
import ChatbotBubble from "component/chatbotBubble";
import ChattingBubble from "component/chattingBuble";
import BigIndex from "component/bigIndex";
import ModalSave from "component/modalSave";
import ThreedotDropdown from "component/threedotDropdown";

export default function Main() {
  // 모달창 띄우기 위한 state 함수
  const [showModalSave, setShowModalSave] = useState(false);

  // 클릭시 모달 오픈 여부를 변경하는 함수
  const openModalSave = () => {
    setShowModalSave(!showModalSave);
    console.log("저장 모달 열림", showModalSave);
  };

  return (
    <>
      <div className={styles.div}>
        <p>Welcome to Main Page!!</p>
        {/* <ChatbotBubble mode={"BOT"} />
      <ChatbotBubble mode={"USER"} />
      <ChatbotBubble mode={"INDEX"} /> */}

        {/* <ChattingBubble /> */}

        {/* <BigIndex /> */}

        {/* <ThreedotDropdown reset trash share save /> */}
        <button
          type="button"
          style={{ backgroundColor: "teal" }}
          onClick={() => openModalSave()}
        >
          모달창 띄우기
        </button>
        {showModalSave && <ModalSave openModalSave={openModalSave} />}
      </div>
    </>
  );
}
