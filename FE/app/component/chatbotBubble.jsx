import Image from "next/image";
import styles from "styles/component/chatBotBubble.module.css";
import SmallIndex from "./smallIndex";

export default function ChatBotBubble({ mode, message, indexes, sendMessage }) {
  if (mode === "BOT") {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nicknameBox}>
          <Image
            src="icon/smile.svg"
            alt="smile icon"
            width={24}
            height={24}
          ></Image>
          <p>Point Chat Bot</p>
        </div>
        <div className={styles.bubbleBox}>
          <div className={styles.chatbotBubble}>{message}</div>
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
    return <SmallIndex indexes={indexes} sendMessage={sendMessage} />;
  }
  return null;
}
