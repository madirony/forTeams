"use client";

import { useState } from "react";
import styles from "styles/main.module.css";

// import MenuBar from "component/menuBar";

export default function Main() {
  // 모달창 띄우기 위한 state 함수
  const [showModalSave, setShowModalSave] = useState(false);

  // 클릭시 모달 오픈 여부를 변경하는 함수
  const openModalSave = () => {
    setShowModalSave(!showModalSave);
    console.log("저장 모달 열림", showModalSave);
  };

  return (
    <div className={styles.div}>
      <p>Welcome to Main Page!!</p>
      {/* <MenuBar /> */}
    </div>
  );
}
