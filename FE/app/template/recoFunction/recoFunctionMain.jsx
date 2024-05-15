"use client";

import styles from "styles/template/RecoFunctionMain.module.css";
import HamburgerTitle from "component/hamburgerTitle";
import { useEffect, useState } from "react";

// API import
import { recoFunc } from "apis/recoFunc";

export default function RecoFunctionMain() {
  const [selectedFunction, setSelectedFunction] = useState(null);

  // 기능 클릭 시 동작을 처리하는 함수
  // const onClickFunction = (functionName) => {
  //   // 선택된 기능이 이미 선택된 상태라면 선택을 취소합니다.
  //   if (selectedFunction === functionName) {
  //     setSelectedFunction(null);
  //   } else {
  //     // 선택된 기능을 업데이트합니다.
  //     setSelectedFunction(functionName);
  //     // 클라우드 선택 시 로직 -> 챗봇 응답 나오게 연결?
  //     console.log("클라우드 클릭~");
  //   }
  // };

  const [functions, setFunctions] = useState([]);
  useEffect(() => {
    recoFunc().then((response) => {
      // console.log("본부 인기 차트", response);
      setFunctions(response);
    });
  }, []);
  // console.log("펑션", functions);

  return (
    <div className={styles.wrapper}>
      <div className={styles.hamburgerTitle}>
        <HamburgerTitle icon={"reco.svg"} title={"많이 찾은 기능"} />
      </div>

      <div className={styles.text}>
        <p>우리 본부 동료들이 많이 찾아본 Teams 기능 순위예요</p>
      </div>

      <div className={styles.ranking}>
        {functions.length > 0 ? (
          functions.map((func, index) => (
            <button key={index} className={styles.button}>
              {`${index + 1}. ${func[0]}`}
            </button>
          ))
        ) : (
          <div>loading...</div> // 데이터가 없거나 로딩 중일 때의 대체 텍스트
        )}
      </div>
    </div>
  );
}
