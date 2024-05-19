import styles from "styles/template/mypageMyLogsDetail.module.css";
import HistoryTitle from "component/historyTitle";
import ChatBotBubble from "component/chatbotBubble";
import ThreedotDropdown from "component/threedotDropdown";
import { useEffect, useState } from "react";
import { getChatLogDetail } from "apis/allLog";

export default function MypageMyLogsDetail({
  logId,
  setLogId,
  openModalShare,
}) {
  const [title, setTitle] = useState("");
  // const [updatedAt, setUpdatedAt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatbotChatUUID, setChatbotChatUUID] = useState("");

  // 챗봇 로그 상세 조회 API
  useEffect(() => {
    getChatLogDetail(logId).then((response) => {
      // console.log("mypagemyLogs!!", response);
      setTitle(response.chatTitle);
      // console.log(response.chatLogs[0].createdAt);
      // setUpdatedAt(response.createdAt);
      setMessages(response.chatLogs);
      setChatbotChatUUID(response.chatbotChatUUID);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <HistoryTitle
        title={title}
        setLogId={setLogId}
        logId={logId}
        openModalShare={openModalShare}
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
