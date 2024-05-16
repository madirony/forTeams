"use client";

import styles from "styles/page/layoutContent.module.css";
import React, { useEffect } from "react";
import { decodeToken } from "util/getToken";

export default function LayoutContent({ children }) {
  // 페이지가 로드될 때마다 사용자 정보를 로컬에 저장
  useEffect(() => {
    console.log("사용자 정보를 로컬에 저장");
    decodeToken();
  }, []);

  return (
    <div className={styles.container}>
      {children}
      {/* {isLogined ? <Main>{children}</Main> : <LoginMain>{children}</LoginMain>} */}
    </div>
  );
}
