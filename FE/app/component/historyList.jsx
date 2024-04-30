"use client";

import styles from "styles/component/historyList.module.css";

export default function HistoryList({ data }) {
  // date 객체 까는 로직 작성
  // const date =

  const onClick = () => {
    console.log("historylist 클릭");
    // ★ 챗봇 상세 페이지로 이동하는 로직 작성
  };

  return (
    <div className={styles.listContainer} onClick={onClick}>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.date}>{data.updatedAt}</p>
    </div>
  );
}
