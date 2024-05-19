"use client";

import styles from "styles/page/layoutContent.module.css";
import React, { useEffect } from "react";
import { saveToken } from "util/getToken";

export default function LayoutContent({ children }) {
  // 페이지가 로드될 때마다 사용자 정보를 로컬에 저장하는 함수
  useEffect(() => {
    saveToken();
  }, []);

  return (
    <div className={styles.container}>
      {children}
      {/* {isLogined ? <Main>{children}</Main> : <LoginMain>{children}</LoginMain>} */}
    </div>
  );
}
