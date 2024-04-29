"use client";

import styles from "styles/component/bigIndex.module.css";
import Image from "next/image";

export default function BigIndex() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.button} onClick={() => console.log("사내협업")}>
          <Image
            src="icon/bigIndexInternal.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          사내협업
        </div>
        <div className={styles.button} onClick={() => console.log("외부협업")}>
          <Image
            src="icon/bigIndexExternal.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          외부협업
        </div>
        <div className={styles.button} onClick={() => console.log("일정관리")}>
          <Image
            src="icon/bigIndexCalander.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          일정관리
        </div>
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.button} onClick={() => console.log("추가 앱")}>
          <Image
            src="icon/bigIndexApps.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          추가 앱
        </div>
        <div className={styles.button} onClick={() => console.log("검색")}>
          <Image
            src="icon/bigIndexSearch.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          검색
        </div>
        <div className={styles.button} onClick={() => console.log("유저설정")}>
          <Image
            src="icon/bigIndexSetting.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          유저설정
        </div>
      </div>
    </div>
  );
}
