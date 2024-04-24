// "use client";

// import Image from "next/image";
import styles from "styles/input.module.css";

export default function Input() {
  return (
    <div className={styles.gap}>
      <p className={styles.title}>제목</p>
      <input className={styles.input}></input>
    </div>
  );
}
