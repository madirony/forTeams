"use client";

import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import styles from "styles/template/chatMain.module.css";
import HamburgerTitle from "component/hamburgerTitle";
import ChattingBubble from "component/chattingBubble";
import ChatBotInput from "component/chatBotInput";

export default function ChatMain() {
  const userId = "666"; // 사용자 ID를 상수로 설정
  const [messages, setMessages] = useState([]); // 메시지 목록을 관리할 상태
  const [client, setClient] = useState(null); // WebSocket 클라이언트
  const messageEndRef = useRef(null); // 메시지 리스트의 끝을 가리키는 ref

  // WebSocket 연결 설정
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/api/ws/openchat", // 서버의 WebSocket URL
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("openchat WebSocket에 연결되었습니다.");
        // 서버로부터 메시지를 수신하면 메시지 목록에 추가
        stompClient.subscribe('/exchange/openchat.exchange/chat', (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages(prev => [...prev, newMessage]);
        });
      },
      onStompError: (error) => {
        console.error("WebSocket 오류:", error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = (content) => {
    if (client && client.connected) {
      const message = {
        senderUUID: userId, // 메시지 전송자의 UUID
        message: content, // 메시지 내용
        messageUUID: "",
        replyMsgUUID: "",
        replyTo: "",
        removeCheck: ""
      };
      client.publish({
        destination: "/pub/openchat.message",
        body: JSON.stringify(message),
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hamburgerTitle}>
        <HamburgerTitle icon={"chatting.svg"} title={"실시간 채팅"} />
      </div>

      <div className={styles.socket}>
        {messages.map((msg, index) => (
          <ChattingBubble
            key={index}
            uuid={msg.senderUUID}
            // user={msg.user}
            user="흑두루미"
            content={msg.message}
            createdAt={msg.createdAt}
          />
        ))}
      </div>

      <div className={styles.input}>
        <ChatBotInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
