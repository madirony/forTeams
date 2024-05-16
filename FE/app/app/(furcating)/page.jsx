"use client";

import styles from "styles/page/layoutContent.module.css";
import React, { useEffect, useState } from "react";
import Main from "app/main/page";
import LoginMain from "app/login/page";
import { getIsLogined } from "util/getToken";

export default function LayoutContent({ children }) {
  // 로그인 여부를 판단할 변수 선언
  //   const [isLogined, setIsLogined] = useState(false);
  let isLogined = true;

  // 페이지가 로드될 때마다 isLogined를 검사
  useEffect(() => {
    let isLogined = getIsLogined();
    console.log("isLogined", isLogined);
  }, []);

  // 리다이렉트 함수 사용하기
  // if

  return (
    <div className={styles.container}>
      {children}
      {/* {isLogined ? <Main>{children}</Main> : <LoginMain>{children}</LoginMain>} */}
    </div>
  );
}
4;
