import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "styles/component/chatBotBubble.module.css";
import SmallIndex from "./smallIndex";

function cleanMarkdown(markdownText) {
  // 영어, 한글 문자 뒤에 `.` 또는 `:`가 붙으면 개행 추가
  return markdownText.replace(/([가-힣])([.:])(?!#)/g, "$1$2\n\n");
}

export default function ChatBotBubble({
  mode,
  message,
  indexes,
  sendIndexMessage,
}) {
  if (mode === "BOT") {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nicknameBox}>
          <Image
            src="icon/smile.svg"
            alt="smile icon"
            width={24}
            height={24}
          />
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
    return <SmallIndex indexes={indexes} sendIndexMessage={sendIndexMessage} />;
  }
  return null;
}
