"use client";

import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import styles from "styles/template/chatBotMain.module.css";
import ChatBotBubble from "component/chatBotBubble";
import ThreedotDropdown from "component/threedotDropdown";
import BigIndex from "component/bigIndex";
import ChatBotInput from "component/chatBotInput";
import ModalShare from "component/modalShare";
import ModalSave from "component/modalSave";

export default function ChatBotMain() {
  // 챗봇 메인 - 웹소켓 연결

  // 모달 오픈 여부를 저장할 변수
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);

  //websocket 관련
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const [streamId, setStreamId] = useState(null);

  const [currentStream, setCurrentStream] = useState(""); // 현재 스트림 메시지를 저장


  const handleStreamFinish = () => {
    setMessages(prev => {
      const newMessage = { msg: currentStream, sender: "BOT" };
      if (prev.length === 0) {
        console.log("0dlfEo");
        console.log(newMessage);
        return [newMessage];
      } else if (prev.length === 1) {
        console.log("1dlfEO");
        console.log(newMessage);
        return [...prev, newMessage];
      } else {
        console.log("2dlfEo");
        // 마지막에서 두 번째 위치에 새 메시지 삽입
        let newMessages = [...prev];
        console.log(newMessages);
        console.log("Gdgd");
        // newMessages.pop();
        newMessages.push(newMessage);
        console.log(newMessages);
        return newMessages;
      }
    });
    setCurrentStream("");  // 스트림 내용을 추가하고 초기화
  };

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "wss://forteams.co.kr/api/ws/chatbot",
      onConnect: () => {
        console.log("Connected to the WebSocket");

        stompClient.subscribe('/exchange/chatbot.exchange/chatbot.123', (message) => {
          const receivedMsg = JSON.parse(message.body);
          console.log("Received message : ", receivedMsg);
          if(receivedMsg.type === "ask"){
            setMessages(prev => [...prev, receivedMsg]);
          }
          else if(receivedMsg.type === "stream") {
            setCurrentStream(prev => prev + receivedMsg.msg);
          }
          else if(receivedMsg.type === "streamFin"){
            // handleStreamFinish();
          }
          // else{
          //   setMessages(prev => [...prev, receivedMsg]);
          // }
        });
      },
      onStompError: (error) => {
        console.error('STOMP Error:', error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (msg) => {
    if (client && client.connected) {
      if (currentStream.length > 0){
        console.log(currentStream);
        console.log("gdgd");
        handleStreamFinish();
      }
      const message = {
        type: "ask",
        sender: "USER",
        msg: msg
      };
      client.publish({
        destination: "/pub/chatbot.message.123",
        body: JSON.stringify(message),
      });

      // 추천 메시지 전송
      const recommendMessage = {
        type: "recommend",
        sender: "USER",
        msg: msg
      };
      client.publish({
        destination: "/pub/chatbot.message.123",
        body: JSON.stringify(recommendMessage),
      });

    }

    
  };

  // 클릭시 모달 오픈 여부를 변경하는 함수
  const openModalShare = () => {
    setShowModalShare(!showModalShare);
  };
  const openModalSave = () => {
    setShowModalSave(!showModalSave);
  };

  return (
    <div className={styles.wrapper}>
      {/* 모달 띄우는 부분 */}
      {showModalShare && (
        <ModalShare chatbotid={999999} openModalShare={openModalShare} />
      )}
      {showModalSave && (
        <ModalSave chatbotid={123456} openModalSave={openModalSave} />
      )}

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
        <BigIndex />
      </div>

      <div className={styles.socket}>
        {
          messages.map((msg, index) => (
            <ChatBotBubble key={index} mode={msg.sender === "USER" ? "USER" : "BOT"} message={msg.msg} />
          ))
        }

        {
          currentStream && <ChatBotBubble mode="BOT" message={currentStream} />
        }

      </div>

      <div className={styles.input}>
        <ChatBotInput placeholder={"궁금한 내용을 질문해보세요"} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
