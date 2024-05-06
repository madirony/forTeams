"use client";

import { useState } from "react";
import styles from "styles/template/chatBotMain.module.css";
import ChatBotBubble from "component/chatBotBubble";
import ThreedotDropdown from "component/threedotDropdown";
import BigIndex from "component/bigIndex";
import ChatBotInput from "component/chatBotInput";
import ModalShare from "component/modalShare";
import ModalSave from "component/modalSave";
import RecoQuestions from "component/recoQuestions";

export default function ChatBotMain() {
  // 임의의 데이터 (title과 func를 포함한 객체 3개)
  const data = [
    { title: '기능1', func: '기능1 설명' },
    { title: '기능2', func: '기능2 설명' },
    { title: '기능3', func: '기능3 설명' }
  ];


  // 챗봇 메인 - 웹소켓 연결

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
    <div className={styles.wrapper}>
      {/* 모달 띄우는 부분 */}
      {showModalShare && (
        <ModalShare chatbotid={999999} openModalShare={openModalShare} />
      )}
      {showModalSave && (
        <ModalSave chatbotid={123456} openModalSave={openModalSave} />
      )}

      <div className={styles.threeDot}>
        <ThreedotDropdown
          reset
          share
          save
          openModalShare={openModalShare}
          openModalSave={openModalSave}
        />
      </div>

      <div className={styles.topNav}>
        <BigIndex />
      </div>

      <div className={styles.socket}>
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="USER" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="USER" />
        <ChatBotBubble mode="USER" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />

        {/* ============3개 기능 추천 부분============== */}
        <div>
          {data.map((item, index) => (
            <RecoQuestions key={index} title={item.title} func={[item.func]} />
          ))}
        </div>
      {/* =========================================== */}
      </div>

      <div className={styles.input}>
        <ChatBotInput placeholder={"궁금한 내용을 질문해보세요"} />
      </div>
    </div>
  );
}
