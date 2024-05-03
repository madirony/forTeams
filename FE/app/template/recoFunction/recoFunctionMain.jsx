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
    "외부인과 채팅하기",
  ];
  return (
    <div className={styles.wrapper}>
      <HamburgerTitle icon={"reco.svg"} title={"추천 기능"} />
      <h2 className={styles.h2}>사람들이 많이 찾는 기능!</h2>
      <p className={styles.text}>사람들이 많이 찾는 기능이에요</p>
      {/* 워드 클라우드 형식으로 5개 기능 넣기 */}
      <div>
        {functions.map((func, index) => (
          <button
            key={index}
            className={styles.wordCloud}
            onClick={() => onClickFunction(func)}
          >
            {func}
          </button>
        ))}
      </div>
    </div>
  );
}
