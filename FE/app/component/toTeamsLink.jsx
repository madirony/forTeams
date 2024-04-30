"use client";

import styles from "styles/component/toTeamsLink.module.css";
import Image from "next/image";

export default function ToTeamsLink() {
  const onClick = () => {
    console.log("ToTeamsLink 클릭!");
    // ★ ToTemasLink 클릭 시 로직 작성
  };

  return (
    <div className={styles.useTeams} onClick={onClick}>
      <Image src="icon/teams.svg" alt="Use teams" width={20} height={20} />
      <p className={styles.text}>Teams에서 바로 사용해보기</p>
    </div>
  );
}
