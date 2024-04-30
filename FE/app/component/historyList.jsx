"use client";

import styles from "styles/component/historyList.module.css";

export default function HistoryList() {
  const onClick = () => {
    console.log("historylist 클릭");
    // ★ 챗봇 상세 페이지로 이동하는 로직 작성
  };
  return (
    <div className={styles.listContainer} onClick={onClick}>
      <p className={styles.title}>내 계정에서 조직도 확인하기</p>
      <p className={styles.date}>2024.04.29</p>
    </div>
  );
}
