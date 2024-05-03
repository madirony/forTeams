import styles from "styles/template/chatBotMain.module.css";
import ChatBotBubble from "component/chatBotBubble";
import ThreedotDropdown from "component/threedotDropdown";
import BigIndex from "component/bigIndex";
import ChatBotInput from "component/chatBotInput";

export default function ChatBotMain() {
  // 챗봇 메인 - 웹소켓 연결

  return (
    <div className={styles.wrapper}>
      <div className={styles.topNav}>
        <BigIndex />
        <div className={styles.threeDot}>
          <ThreedotDropdown
            reset
            share
            save
            //   openModalShare={openModalShare}
            //   openModalSave={openModalSave}
          />
        </div>
      </div>

      <div className={styles.socket}>
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="BOT" />
        <ChatBotBubble mode="USER" />
      </div>

      <div className={styles.input}>
        <ChatBotInput />
      </div>
    </div>
  );
}
