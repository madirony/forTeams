"use client";

import Image from "next/image";
import styles from "styles/component/menuBar.module.css";
import { useRouter } from "next/navigation";
import LocalStorage from "util/localStorage";

// 로그아웃 API
import { logout } from "apis/login";

export default function MenuBar({ userNickname, userDept, userId }) {
  const router = useRouter();

  // 로고 클릭 이벤트
  const logoOnClick = () => {
    router.push("/");
  };

  // 마이페이지 버튼 클릭 이벤트
  const mypageOnClick = () => {
    router.push("/mypage");
  };

  // 로그아웃 버튼 클릭 이벤트
  const logtoutOnClick = () => {
    localStorage.clear();
    console.log("[Logout] All items removed");
    logout()
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {});
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
        <p>{userNickname}님</p>
        <div onClick={mypageOnClick} className={styles.mypageButton}>
          마이페이지
        </div>
        <p className={styles.logoutButton} onClick={logtoutOnClick}>
          로그아웃
        </p>
      </div>
    </div>
  );
}
