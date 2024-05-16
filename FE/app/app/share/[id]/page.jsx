"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "styles/page/share.module.css";
import ChatBotBubble from "component/chatbotBubble";
import { getChatLogDetail } from "apis/allLog";

export default function ShareMain() {
  const pathname = usePathname();
  // console.log("pathname...", pathname);
  const id = pathname.match(/\/share\/([^/]+)/)?.[1] || ""; // 정규식을 사용하여 ID 추출
  // console.log("id뽑", id);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getChatLogDetail(id).then((response) => {
      console.log("sharepage에서 response뽑", response);
      setMessages(response.chatLogs);
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      {/* ========================================================== */}
      <div className={styles.socket}>
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
          />
        ))}
      </div>
      {/* =============================================================== */}
    </div>
  );
}
