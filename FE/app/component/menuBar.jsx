"use client";

import Image from "next/image";
import styles from "styles/component/menuBar.module.css";

export default function MenuBar() {
  const onClick = () => {
    //로고 클릭 시 이벤트 달기
    console.log("로고 클릭");
  };
  return (
    <div className={styles.menu}>
      <div onClick={onClick}>
        <Image
          src="icon/forTeams.svg"
          alt="Logo"
          width={125}
          height={90}
        ></Image>
      </div>
      <div className={styles.gap}>
        <p className={styles.text}>철강영업팀</p>
        <p className={styles.text}>이수민님</p>
        <p>마이페이지버튼</p>
      </div>
    </div>
  );
}
