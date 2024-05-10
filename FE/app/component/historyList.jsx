"use client";

import styles from "styles/component/historyList.module.css";
import getDate from "util/getDate";
import Link from "next/link";

export default function HistoryList({ data, setLogId }) {
  // datetime 객체 변환하기
  const updateDate = getDate(data.updatedAt);

  // const handleClick = () => {
  //   if (router) {
  //     router.push("/another-page");
  //   }
  // };

  const onClick = () => {
    // console.log("historylist 클릭");
    setLogId(data.id);
    // ★ 챗봇 상세 페이지로 이동하는 로직 작성
  };

  return (
    <div className={styles.listContainer} onClick={onClick}>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.date}>{updateDate}</p>
    </div>
  );
}
