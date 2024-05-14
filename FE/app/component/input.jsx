"use client";

import styles from "styles/component/input.module.css";

export default function Input({
  title,
  placeholder,
  w,
  message,
  handleMessage,
}) {
  // 필요시 input 사이즈를 지정, default 값은 100%
  const inputSize = {
    "--inputWidth": w,
  };

  return (
    <div style={inputSize} className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={message}
        onChange={handleMessage}
      ></input>
    </div>
  );
}
