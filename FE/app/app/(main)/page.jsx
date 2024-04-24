import styles from "styles/main.module.css";
import ChatbotBubble from "component/chatbotBubble";
import ChattingBubble from "component/chattingBuble";
import BigIndex from "component/bigIndex";

export default function Main() {
  return (
    <div className={styles.div}>
      <p>Welcome to Main Page!!</p>
      {/* <ChatbotBubble mode={"BOT"} />
      <ChatbotBubble mode={"USER"} />
      <ChatbotBubble mode={"INDEX"} /> */}

      {/* <ChattingBubble /> */}

      <BigIndex />
    </div>
  );
}
