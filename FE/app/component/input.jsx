"use client";

import { useState } from "react";
import styles from "styles/component/input.module.css";

export default function Input({ title, placeholder, w }) {
  // 필요시 input 사이즈를 지정, default 값은 100%
  const inputSize = {
    "--inputWidth": w,
  };
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div style={inputSize} className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      {/* input 창 width prop으로 주기 */}
      <input
        className={styles.input}
        placeholder={placeholder}
        value={message}
        onChange={onChange}
      ></input>
    </div>
  );
}
