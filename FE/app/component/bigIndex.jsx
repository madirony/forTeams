"use client";

import styles from "styles/bigIndex.module.css";
import Image from "next/image";

export default function BigIndex() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onClick={() => console.log("사내협업")}>
        <Image
          src="icon/bigIndexInternal.svg"
          alt="big index external"
          width={37}
          height={37}
        />
        사내협업
      </div>
      <div className={styles.button} onClick={() => console.log("사내협업")}>
        <Image
          src="icon/bigIndexInternal.svg"
          alt="big index external"
          width={37}
          height={37}
        />
        사내협업
      </div>
      <div className={styles.button} onClick={() => console.log("사내협업")}>
        <Image
          src="icon/bigIndexInternal.svg"
          alt="big index external"
          width={37}
          height={37}
        />
        사내협업
      </div>
      <div className={styles.button} onClick={() => console.log("사내협업")}>
        <Image
          src="icon/bigIndexInternal.svg"
          alt="big index external"
          width={37}
          height={37}
        />
        사내협업
      </div>
      <div className={styles.button} onClick={() => console.log("사내협업")}>
        <Image
          src="icon/bigIndexInternal.svg"
          alt="big index external"
          width={37}
          height={37}
        />
        사내협업
      </div>
      <div className={styles.button} onClick={() => console.log("사내협업")}>
        <Image
          src="icon/bigIndexInternal.svg"
          alt="big index external"
          width={37}
          height={37}
        />
        사내협업
      </div>
    </div>
  );
}
