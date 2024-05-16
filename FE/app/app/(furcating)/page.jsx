"use client";

import styles from "styles/page/layoutContent.module.css";
import React, { useEffect, useState } from "react";
import Main from "app/main/page";
import LoginMain from "app/login/page";
import { getToken, decodeToken } from "util/getToken";

export default function LayoutContent({ children }) {
  // 로그인 여부를 판단할 변수 선언
  //   const [isLogined, setIsLogined] = useState(false);
  let isLogined = true;

  // 페이지가 로드될 때마다 isLogined를 검사
  useEffect(() => {
    console.log("furcating 페이지에서 토큰 까기");
    decodeToken();
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
