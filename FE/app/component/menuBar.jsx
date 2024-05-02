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
        {/* <source media="(max-width: 360px)" src="icon/forTeams.svg" />
        <source media="(min-width: 361px)" />
        <Image src="icon/forTeams.svg" alt="Logo" width={125} height={90} /> */}
      </div>
      <div className={styles.userInfo}>
        <p>{userDept}</p>
        <p>{userName}님</p>
        <div className={styles.mypageButton}>
          <Image
            onClick={mypageOnClick}
            src="icon/myPageButton.svg"
            alt="Mypage Button"
            width={125}
            height={90}
          />
        </div>
      </div>
    </div>
  );
}
