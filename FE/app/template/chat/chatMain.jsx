"use client";

import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import axios from 'axios';
import styles from "styles/template/chatMain.module.css";
import HamburgerTitle from "component/hamburgerTitle";
import ChattingBubble from "component/chattingBubble";
import ChatBotInput from "component/chatBotInput";

export default function ChatMain() {
  const userId = "666";
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [replyMsgUUID, setReplyMsgUUID] = useState(null);
  const [replyToName, setReplyToName] = useState("");

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "wss://forteams.co.kr/api/ws/openchat",
      // brokerURL: "ws://localhost:8080/api/ws/openchat",
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("openchat WebSocket에 연결되었습니다.");
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

  useEffect(() => {
    // axios.get('http://localhost:8080/api/v1/openchat/today')
    axios.get('https://forteams.co.kr/api/v1/openchat/today')
      .then(response => {
        setMessages(response.data);
        scrollToBottom();
      })
      .catch(error => console.error('메시지 로드 실패:', error));
  }, []);

  useEffect(() => {
    // axios.get('http://localhost:8080/api/v1/openchat/today')
    axios.get('https://forteams.co.kr/api/v1/openchat/today')
      .then(response => {
        setMessages(response.data);
        scrollToBottom();
      })
      .catch(error => console.error('메시지 로드 실패:', error));
  }, []);

  useEffect(() => {
    console.log(`Updated replyMsgUUID: ${replyMsgUUID}, replyTo: ${replyTo}`);
  }, [replyMsgUUID, replyTo]);


  const handleReply = (messageUUID, senderName) => {
    setReplyMsgUUID(messageUUID);
    setReplyTo(senderName);
    setReplyToName(senderName);
  };

  const sendMessage = (content) => {
    if (client && client.connected) {
      const message = {
        senderUUID: userId,
        message: content,
        messageUUID: "",
        replyMsgUUID: replyMsgUUID,
        replyTo: replyTo,
        removeCheck: ""
      };
      client.publish({
        destination: "/pub/openchat.message",
        body: JSON.stringify(message),
      });
      // Reset reply state after sending message
      setReplyMsgUUID(null);
      setReplyTo(null);
      setReplyToName("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hamburgerTitle}>
        <HamburgerTitle icon={"chatting.svg"} title={"실시간 채팅"} />
      </div>

      <div className={styles.socket} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <ChattingBubble
            key={index}
            uuid={msg.senderUUID}
            msgUuid={msg.messageUUID}
            user="흑두루미"
            content={msg.message}
            createdAt={msg.createdAt}
            handleReply={handleReply}
            replyTo={msg.replyTo}
            replyMsgUUID={msg.replyMsgUUID}
          />
        ))}
      </div>
      <div className={styles.input}>
        {replyToName && <div className={styles.replyIndicator}>답장: {replyToName}</div>}
        <ChatBotInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
