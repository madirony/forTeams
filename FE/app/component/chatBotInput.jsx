"use client";

import Image from "next/image";
import styles from "styles/component/chatBotInput.module.css";
import { useRef, useState } from "react";
import { saveChatbot, pauseChatbot } from "apis/chatbot";

export default function ChatBotInput({ mode, placeholder, sendMessage }) {
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

  // 엔터 버튼 클릭시 실행
  const onClickEnter = () => {
    if (typeof sendMessage === "function") {
      sendMessage(message);
      console.log("전송된 메시지:", message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "1.5rem";
      }
    } else {
      console.error("sendMessage is not a function");
    }
  };

  // 입력 클릭했을 때와 동일한 기능(메시지 전송)
  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClickEnter();
    }
  };

  // 중단 버튼 클릭시 실행
  const onClickStop = (uuid) => {
    console.log("스트림 중단 요청 API");
    console.log(uuid);
    pauseChatbot(uuid);
  };

  switch (mode) {
    // mode가 stream이면 stop 버튼 출력
    case "STREAM":
      return (
        <div className={styles.div}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder={
              placeholder ? placeholder : "중단하려면 버튼을 누르세요"
            }
            value={message}
            onChange={onChange}
            style={{
              minHeight: "1.5rem",
              maxHeight: "9rem",
              overflowY: "auto",
            }} // 최소(1줄) 및 최대 높이(6줄) 및 스크롤바 설정
          ></textarea>
          <div
            onClick={() => onClickStop("123")}
            className={styles.imgContainer}
          >
            <Image
              src="icon/stop.svg"
              alt="Stop"
              width={22}
              height={22}
            ></Image>
          </div>
        </div>
      );

    // 그 외 일때는 엔터 버튼 출력
    case "DEFAULT":
      return (
        <div className={styles.div}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder={placeholder ? placeholder : "채팅을 입력해보세요"}
            value={message}
            onChange={onChange}
            onKeyPress={onKeyPress}
            style={{
              minHeight: "1.5rem",
              maxHeight: "9rem",
              overflowY: "auto",
            }} // 최소(1줄) 및 최대 높이(6줄) 및 스크롤바 설정
          ></textarea>
          <div onClick={onClickEnter} className={styles.imgContainer}>
            <Image
              src="icon/enter.svg"
              alt="Enter"
              width={22}
              height={22}
            ></Image>
          </div>
        </div>
      );
    default:
      <></>;
  }
}
