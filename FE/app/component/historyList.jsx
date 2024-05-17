"use client";

import styles from "styles/component/historyList.module.css";
import getDate from "util/getDate";
import Link from "next/link";

export default function HistoryList({ data, setLogId }) {
  // datetime 객체 변환하기
  const updateDate = data.createdAt ? getDate(data.createdAt) : null;

  // console.log("data뽑기~~~", data);

  const onClick = () => {
    setLogId(data.chatbotChatUUID);
    // ★ 챗봇 상세 페이지로 이동하는 로직 작성
  };

  return (
    <div className={styles.listContainer} onClick={onClick}>
      <p className={styles.title}>{data.chatTitle}</p>
      {updateDate && <p className={styles.date}>{updateDate}</p>}
      {/* <p className={styles.date}>{updateDate}</p> */}
    </div>
  );
}
