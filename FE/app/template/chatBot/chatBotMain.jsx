"use client";

import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import styles from "styles/template/chatBotMain.module.css";
import ChatBotBubble from "component/chatbotBubble";
import ThreedotDropdown from "component/threedotDropdown";
import BigIndex from "component/bigIndex";
import SmallIndex from "component/smallIndex";
import ChatBotInput from "component/chatBotInput";
import ModalShare from "component/modalShare";
import ModalSave from "component/modalSave";
import RecoQuestions from "component/recoQuestions";

export default function ChatBotMain() {
  // 모달 오픈 여부를 저장할 변수 ================================
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);

  // 클릭시 모달 오픈 여부를 변경하는 함수 ========================
  const openModalShare = () => {
    setShowModalShare(!showModalShare);
  };
  const openModalSave = () => {
    setShowModalSave(!showModalSave);
  };

  // websocket 연결 ============================================
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsReady, setRecommendationsReady] = useState(false);

  const [streamId, setStreamId] = useState(null);

  const [streamArray, setStreamArray] = useState([]);
  const [currentStream, setCurrentStream] = useState(""); // 현재 스트림 메시지를 저장

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, recommendations, currentStream, recommendationsReady]); // 메시지 배열이 변경될 때마다 스크롤

  const handleStreamFinish = () => {
    setMessages((prev) => {
      const newMessage = { msg: currentStream, sender: "BOT" };
      if (prev.length === 0) {
        // console.log("0dlfEo");
        // console.log(newMessage);
        return [newMessage];
      } else if (prev.length === 1) {
        // console.log("1dlfEO");
        // console.log(newMessage);
        return [...prev, newMessage];
      } else {
        // console.log("2dlfEo");
        // 마지막에서 두 번째 위치에 새 메시지 삽입
        let newMessages = [...prev];
        // console.log(newMessages);
        // console.log("Gdgd");
        // newMessages.pop();
        newMessages.push(newMessage);
        // console.log(newMessages);
        return newMessages;
      }
    });
    setStreamArray([]); // 스트림 메시지 배열 초기화
    setCurrentStream(""); // 스트림 내용을 추가하고 초기화
  };

  useEffect(() => {
    const combinedStream = streamArray
      .sort((a, b) => a.sequence - b.sequence) // 시퀀스 순서로 정렬
      .map((msg) => msg.msg)
      .join(""); // 문자열 합치기
    setCurrentStream(combinedStream);
  }, [streamArray]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "wss://forteams.co.kr/api/ws/chatbot",
      // brokerURL: "ws://localhost:8080/api/ws/chatbot",
      onConnect: () => {
        console.log("Connected to the WebSocket");

        stompClient.subscribe(
          "/exchange/chatbot.exchange/chatbot.123",
          (message) => {
            const receivedMsg = JSON.parse(message.body);
            console.log("Received message : ", receivedMsg);

            if (receivedMsg.type === "ask") {
              setMessages((prev) => [...prev, receivedMsg]);
              setInputMode("DEFAULT");
            } else if (receivedMsg.type === "stream") {
              setStreamArray((prev) => [...prev, receivedMsg]);
              setInputMode("STREAM");
            } else if (receivedMsg.type === "streamFin") {
              setInputMode("DEFAULT");

              // handleStreamFinish();
            } else if (receivedMsg.type === "recommendRes") {
              // 대괄호를 제거하고 결과 문자열을 쉼표로 분리하여 배열로 변환
              const cleanedData = receivedMsg.msg.replace(/^\[|\]$/g, ""); // 대괄호 제거
              const recommendationsArray = cleanedData
                .split(",")
                .map((item) => item.trim());
              console.log("Formatted recommendations:", recommendationsArray);
              setRecommendations(recommendationsArray);
              setInputMode("DEFAULT");
            } else if (receivedMsg.type === "recommendFin") {
              console.log(receivedMsg);
              setRecommendationsReady(true);
              setInputMode("DEFAULT");
            }
          },
        );
      },
      onStompError: (error) => {
        console.error("STOMP Error:", error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendIndexMessage = (msg) => {
    // children이 없을 때 소켓으로 요청 보내는 함수
    if (client && client.connected) {
      setRecommendations([]);
      setRecommendationsReady(false);

      if (currentStream.length > 0) {
        // console.log("chatBotMain: sendIndexMsg", currentStream);
        handleStreamFinish();
      }
      const message = {
        type: "ask",
        sender: "USER",
        msg: msg,
      };
      client.publish({
        destination: "/pub/chatbot.message.123",
        body: JSON.stringify(message),
      });
    }
  };

  const sendMessage = (msg) => {
    if (client && client.connected) {
      setRecommendations([]);
      setRecommendationsReady(false);

      if (currentStream.length > 0) {
        // console.log(currentStream);
        // console.log("gdgd");
        handleStreamFinish();
      }
      const message = {
        type: "ask",
        sender: "USER",
        msg: msg,
      };
      client.publish({
        destination: "/pub/chatbot.message.123",
        body: JSON.stringify(message),
      });

      // 추천 메시지 전송
      const recommendMessage = {
        type: "recommend",
        sender: "USER",
        msg: msg,
      };
      client.publish({
        destination: "/pub/chatbot.message.123",
        body: JSON.stringify(recommendMessage),
      });
    }
  };

  // children 받아와서 messages에 push하는 함수 ==================
  const [indexes, setIndexes] = useState([]);

  const pushToMessages = (childrenIndex) => {
    // bigIndex에서 분기 가져오기
    setIndexes(childrenIndex);
    // console.log("chatBotMain.jsx : get index 받아옴", indexes);

    // messages에 push하기
    const saveIndexes = { sender: "INDEX", msg: childrenIndex };
    setMessages((prev) => {
      return [...prev, saveIndexes];
    });
  };

  // 스트림 상태에 따라 mode를 변경하는 변수 ======================
  const [inputMode, setInputMode] = useState("DEFAULT");

  return (
    <div className={styles.wrapper}>
      {/* >> 모달 띄우는 부분 */}
      {showModalShare && (
        <ModalShare chatbotid={999999} openModalShare={openModalShare} />
      )}
      {showModalSave && (
        <ModalSave chatbotid={123456} openModalSave={openModalSave} />
      )}
      {/* >> 상단 메뉴 띄우는 부분 */}
      <div className={styles.threeDot}>
        <ThreedotDropdown
          reset
          share
          save
          openModalShare={openModalShare}
          openModalSave={openModalSave}
        />
      </div>
      <div className={styles.topNav}>
        <BigIndex pushToMessages={pushToMessages} />
      </div>
      {/* >> 챗봇 본문 띄우는 부분 */}
      <div className={styles.socket} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <ChatBotBubble
            key={index}
            mode={
              msg.sender === "USER"
                ? "USER"
                : msg.sender === "BOT"
                ? "BOT"
                : "INDEX"
            }
            indexes={msg.msg}
            message={msg.msg}
            // ==== sendIndexMessage, pushToMessages 추가 ====
            sendIndexMessage={sendIndexMessage}
            pushToMessages={pushToMessages}
          />
        ))}
        {currentStream && <ChatBotBubble mode="BOT" message={currentStream} />}
        <div>
          {recommendationsReady &&
            Array.isArray(recommendations) &&
            recommendations.map((item, index) => (
              <RecoQuestions
                key={index}
                content={item}
                sendMessage={sendMessage}
              />
            ))}
        </div>
      </div>
      {/* >> 인풋 받는 부분 */}
      {/* Received message type이 "stream" 이면 중지버튼 출력 */}
      <div className={styles.input}>
        <ChatBotInput
          // mode={"STREAM"}
          mode={inputMode}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}