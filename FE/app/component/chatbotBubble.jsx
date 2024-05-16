import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "styles/component/chatBotBubble.module.css";
import SmallIndex from "./smallIndex";

function cleanMarkdown(markdownText) {
  return (
    markdownText
      // 한글 문자 뒤에 `.` 또는 `:`가 붙으면 개행 추가
      .replaceAll("<br />", "\n\nㅤ")
  );
}

export default function ChatBotBubble({
  mode,
  indexes,
  message,
  sendIndexMessage,
  pushToMessages,
}) {
  if (mode === "BOT") {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nicknameBox}>
          <Image src="icon/smile.svg" alt="smile icon" width={24} height={24} />
          <p>Point Chat Bot</p>
        </div>
        <div className={styles.bubbleBox}>
          <ReactMarkdown
            className={styles.chatbotBubble}
            remarkPlugins={[remarkGfm]}
          >
            {cleanMarkdown(message)}
          </ReactMarkdown>
        </div>
      </div>
    );
  } else if (mode === "USER") {
    return (
      <div className={styles.bubbleBox}>
        <div className={styles.userBubble}>{message}</div>
      </div>
    );
  } else if (mode === "INDEX") {
    return (
      <SmallIndex
        indexes={indexes}
        sendIndexMessage={sendIndexMessage}
        pushToMessages={pushToMessages}
      />
    );
  }
  return null;
}
