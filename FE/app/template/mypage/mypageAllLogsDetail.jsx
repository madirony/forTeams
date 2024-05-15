import styles from "styles/template/mypageAllLogsDetail.module.css";
import HistoryTitle from "component/historyTitle";
import ThreedotDropdown from "component/threedotDropdown";
import ChatBotBubble from "component/chatbotBubble";
import RecoQuestions from "component/recoQuestions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getChatLogDetail } from "apis/allLog";

export default function MypageMyLogsDetail({
  logId,
  setLogId,
  openModalShare,
  openModalSave,
}) {
  // 챗봇 로그 상세 조회 API
  const [title, setTitle] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatbotChatUUID, setChatbotChatUUID] = useState("");

  useEffect(() => {
    getChatLogDetail(logId).then((response) => {
      console.log("mypageallLogs", response);
      setTitle(response.chatTitle);
      // console.log(response.chatLogs[0].createdAt);
      setUpdatedAt(response.createdAt);
      setMessages(response.chatLogs);
      setChatbotChatUUID(response.chatbotChatUUID);
    });
  }, []);
  // console.log(messages);
  // console.log(chatbotChatUUID);

  return (
    <div className={styles.wrapper}>
      <HistoryTitle
        title={title}
        updatedAt={updatedAt}
        setLogId={setLogId}
        logId={logId}
        openModalShare={openModalShare}
        openModalSave={openModalSave}
        chatbotChatUUID={chatbotChatUUID}
      />
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
