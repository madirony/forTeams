"use client";

import styles from "styles/component/bigIndex.module.css";
import Image from "next/image";

export default function BigIndex({ getIndex }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div
          className={styles.button}
          onClick={() => getIndex(["1.1", "1.2", "1.3"])}
        >
          <Image
            src="icon/bigIndexPrepare.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          준비하기
        </div>
        <div
          className={styles.button}
          onClick={() => getIndex(["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"])}
        >
          <Image
            src="icon/bigIndexStart.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          시작하기
        </div>
        <div className={styles.button} onClick={() => getIndex(["3.1", "3.2"])}>
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
        <div
          className={styles.button}
          onClick={() => getIndex(["4.1", "4.2", "4.3", "4.4"])}
        >
          <Image
            src="icon/bigIndexWork.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          업무하기
        </div>
        <div
          className={styles.button}
          onClick={() => getIndex(["5.1", "5.2", "5.3"])}
        >
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
