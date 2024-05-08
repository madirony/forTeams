"use client";

import styles from "styles/template/RecoFunctionMain.module.css";
import HamburgerTitle from "component/hamburgerTitle";
import { useEffect, useState } from "react";

export default function RecoFunctionMain() {
  const [selectedFunction, setSelectedFunction] = useState(null);

  // 기능 클릭 시 동작을 처리하는 함수
  const onClickFunction = (functionName) => {
    // 선택된 기능이 이미 선택된 상태라면 선택을 취소합니다.
    if (selectedFunction === functionName) {
      setSelectedFunction(null);
    } else {
      // 선택된 기능을 업데이트합니다.
      setSelectedFunction(functionName);
      // 클라우드 선택 시 로직 -> 챗봇 응답 나오게 연결?
      console.log("클라우드 클릭~");
    }
  };

  //기능 예시 데이터
  const functions = [
    "외부인 초대하기",
    "화상회의하기",
    "메모 작성하기",
    "화상회의 캐릭터 설정하기",
    "dddd",
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.hamburgerTitle}>
        <HamburgerTitle icon={"reco.svg"} title={"많이 찾은 기능"} />
      </div>

      <div className={styles.text}>
        <p>우리 본부/실 동료들이 많이 찾아본 Teams 기능이예요</p>
        <p>클릭해서 바로 사용법을 알아보세요</p>
      </div>

      <div className={styles.wordCloud}>
        {functions.map((func, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={() => onClickFunction(func)}
          >
            {func}
          </button>
        ))}
      </div>
    </div>
  );
}
