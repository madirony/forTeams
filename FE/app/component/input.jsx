// "use client";

// import Image from "next/image";
import styles from "styles/input.module.css";

export default function Input() {
  return (
    <div>
      <p className={styles.title}>제목</p>
      {/* input 창 width prop으로 주기 */}
      <input className={styles.input} placeholder="제목을 입력하세요"></input>
    </div>
  );
}
