"use client";

import styles from "styles/component/mypageHamburger.module.css";
import HamburgerTitle from "./hamburgerTitle";

export default function MypageHamburger({ selectedPage, setSelectedPage }) {
  // selected 여부를 결정하는 함수
  const getClassName = (currentPage) => {
    return `${styles.list} ${
      selectedPage === currentPage ? styles.selectedList : ""
    }`;
  };

  return (
    <div className={styles.wrapper}>
      <HamburgerTitle icon={"mypage.svg"} title={"마이페이지"} />
      <ul>
        <div
          className={getClassName("info")}
          onClick={() => {
            setSelectedPage("info");
          }}
        >
          <li>사용자 정보</li>
        </div>
        <div
          className={getClassName("allLogs")}
          onClick={() => {
            setSelectedPage("allLogs");
          }}
        >
          <li>전체 기록 확인</li>
        </div>
        <div
          className={getClassName("myLogs")}
          onClick={() => {
            setSelectedPage("myLogs");
          }}
        >
          <li>내가 저장한 기록 확인</li>
        </div>
      </ul>
    </div>
  );
}
