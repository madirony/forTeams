"use client";

import Image from "next/image";
import styles from "styles/component/menuBar.module.css";
import { useRouter } from "next/navigation";

export default function MenuBar({ userName, userDept, userId }) {
  const router = useRouter();

  // 로고 클릭 이벤트
  const logoOnClick = () => {
    router.push("/");
  };

  // 마이페이지 버튼 클릭 이벤트
  const mypageOnClick = () => {
    router.push("/mypage");
  };

  return (
    <div className={styles.menuBar}>
      <div className={styles.logo} onClick={logoOnClick}>
        <div className={styles.bigLogo}>
          <Image src="icon/forTeams.svg" alt="Logo" width={125} height={90} />
        </div>
        <div className={styles.smallLogo}>
          <Image
            src="icon/forTeamsLogoOnly.svg"
            alt="Small Logo"
            width={35}
            height={50}
          />
        </div>
      </div>
      <div className={styles.userInfo}>
        <p>{userDept}</p>
        <p>{userName}님</p>
        <div onClick={mypageOnClick} className={styles.mypageButton}>
          마이페이지
        </div>
      </div>
    </div>
  );
}
