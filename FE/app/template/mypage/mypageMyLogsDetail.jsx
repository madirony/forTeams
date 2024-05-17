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
  // 챗봇 로그 상세 조회 API
  // 아래 예시는 API 호출 후 삭제
  // const title = "내 계정에서 조직도 확인하기";
  // const updatedAt = "2024-04-25T15:36:24";
  const [title, setTitle] = useState("");
  // const [updatedAt, setUpdatedAt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatbotChatUUID, setChatbotChatUUID] = useState("");

  useEffect(() => {
    getChatLogDetail(logId).then((response) => {
      console.log("mypagemyLogs!!", response);
      setTitle(response.chatTitle);
      // console.log(response.chatLogs[0].createdAt);
      // setUpdatedAt(response.createdAt);
      setMessages(response.chatLogs);
      setChatbotChatUUID(response.chatbotChatUUID);
    });
  }, []);

  return (
    // <div className={styles.wrapper}>
    //   <HistoryTitle
    //     title={title}
    //     updatedAt={updatedAt}
    //     setLogId={setLogId}
    //     openModalShare={openModalShare}
    //   />

    //   <div className={styles.logDetail}>{logId}번 챗봇 로그 상세 내용</div>
    // </div>
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
