import styles from "styles/template/chatBotMain.module.css";

import ChatBotBubble from "component/chatBotBubble";
import ThreedotDropdown from "component/threedotDropdown";
import BigIndex from "component/bigIndex";

export default function ChatBotMain() {
  // 챗봇 메인 - 웹소켓 연결

  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <BigIndex />
        <ThreedotDropdown
          reset={true}
          trash={false}
          share={true}
          save={true}
          //   openModalShare={openModalShare}
          //   openModalSave={openModalSave}
        />
      </div>
      <div className={styles.container}>
        <ChatBotBubble mode="BOT" />
        {/* <ChatBotBubble mode="USER" /> */}
        {/* <ChatBotBubble mode="INDEX" /> */}
        <ChatBotBubble mode="USER" />
        {/* <ChatBotBubble mode="BOT" /> */}
      </div>
    </div>
  );
}
