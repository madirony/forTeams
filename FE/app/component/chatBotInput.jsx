"use client";

import Image from "next/image";
import styles from "styles/component/chatBotInput.module.css";
import { useRef, useState } from "react";

export default function ChatBotInput({ placeholder }) {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);

    // textarea 높이 자동 조절
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`; // 계산된 스크롤 높이를 적용
    }
  };

  const onClick = () => {
    // ★메시지 전송 로직 작성하기★
    console.log("전송된 메시지:", message);
    // 메시지 전송 후 상태 초기화
    setMessage("");
    // textarea 높이 초기화(기본값 1.5rem)
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "1.5rem";
    }
  };

  // 입력 클릭했을 때와 동일한 기능(메시지 전송)
  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className={styles.div}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        placeholder={placeholder ? placeholder : "채팅을 입력해보세요"}
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
        style={{ minHeight: "1.5rem", maxHeight: "9rem", overflowY: "auto" }} // 최소(1줄) 및 최대 높이(6줄) 및 스크롤바 설정
      ></textarea>
      <div onClick={onClick} className={styles.imgContainer}>
        <Image src="icon/enter.svg" alt="Enter" width={22} height={22}></Image>
      </div>
    </div>
  );
}
