"use client";

import { useState } from "react";
import styles from "styles/component/input.module.css";

export default function Input() {
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <p className={styles.title}>제목</p>
      {/* input 창 width prop으로 주기 */}
      <input
        className={styles.input}
        placeholder="제목을 입력하세요"
        value={message}
        onChange={onChange}
      ></input>
    </div>
  );
}
