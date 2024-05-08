"use client";

import styles from "styles/component/bigIndex.module.css";
import Image from "next/image";

export default function BigIndex() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.button} onClick={() => console.log("준비하기")}>
          <Image
            src="icon/bigIndexPrepare.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          준비하기
        </div>
        <div className={styles.button} onClick={() => console.log("시작하기")}>
          <Image
            src="icon/bigIndexStart.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          시작하기
        </div>
        <div className={styles.button} onClick={() => console.log("소통하기")}>
          <Image
            src="icon/bigIndexCommunicate.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          소통하기
        </div>
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.button} onClick={() => console.log("업무하기")}>
          <Image
            src="icon/bigIndexWork.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          업무하기
        </div>
        <div className={styles.button} onClick={() => console.log("부가기능")}>
          <Image
            src="icon/bigIndexExtra.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          부가기능
        </div>
      </div>
    </div>
  );
}
