import { useRouter } from "next/navigation";
import styles from "styles/component/historyTitle.module.css";
import getDate from "util/getDate";
import BackArrow from "icon/backArrow.svg";
import ThreedotDropdown from "./threedotDropdown";
import Image from "next/image";
import { chatReload, loadChatLogs } from "apis/chatbot";
import { useState, useEffect } from "react";

export default function HistoryTitle({
  title,
  updatedAt,
  setLogId,
  logId,
  openModalShare,
  openModalSave,
  chatbotChatUUID,
}) {
  // datetime 객체 변환하기
  const updateDate = getDate(updatedAt);

  // 라우터
  const router = useRouter();

  // 뒤로 가기 버튼
  const goBack = () => {
    setLogId();
    // router.back();
  };
  // console.log("??ddddd?", logId);c
  // console.log("----------", chatbotChatUUID);

  // chatReload 호출
  const rewrite = () => {
    if (chatbotChatUUID) {
      chatReload(chatbotChatUUID)
        .then((response) => {
          console.log("채팅 다시쓰기", response);
          // 메인페이지로 이동
          router.push("/main");
          //
        })
        .catch((error) => {
          console.error("Chat Reload Error", error);
        });
    } else {
      console.log("Invalid chatUUID, cannot reload chat.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.backButton} onClick={goBack}>
          <BackArrow width={"20px"} height={"20px"} />
          <p className={styles.hiddenAtMobile}>목록</p>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <p className={`${styles.date} ${styles.hiddenAtMiddle}`}>{updateDate}</p>
      <Image
        src="icon/rewrite.svg"
        alt="rewrite"
        width={20}
        height={20}
        onClick={rewrite}
      />

      {openModalSave ? (
        <ThreedotDropdown
          trash
          share
          save
          openModalShare={openModalShare}
          openModalSave={openModalSave}
          logId={logId}
          setLogId={setLogId}
        />
      ) : (
        <ThreedotDropdown
          trash
          share
          openModalShare={openModalShare}
          logId={logId}
          setLogId={setLogId}
        />
      )}
    </div>
  );
}
