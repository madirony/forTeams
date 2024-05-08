"use client";

import styles from "styles/template/chatMain.module.css";
import HamburgerTitle from "component/hamburgerTitle";
import ChattingBubble from "component/chattingBubble";
import ChatBotInput from "component/chatBotInput";

export default function ChatMain() {
  const userId = 666;

  return (
    <div className={styles.wrapper}>
      <div className={styles.hamburgerTitle}>
        <HamburgerTitle icon={"chatting.svg"} title={"실시간 채팅"} />
      </div>

      <div className={styles.socket}>
        <ChattingBubble
          uuid={123} // 예시로 uuid, user, content, createdAt 값을 전달
          user="에너지개발팀 노성은"
          content="외부인 초대 어떻게 해요?"
          createdAt="2024-04-25T15:36:24"
        />
        <ChattingBubble
          uuid={666} // 예시로 uuid, user, content, createdAt 값을 전달
          user="철강영업팀 이수민"
          content="저도 모르겠어요ㅠ"
          createdAt="2024-04-25T15:36:24"
        />
        <ChattingBubble
          uuid={666} // 예시로 uuid, user, content, createdAt 값을 전달
          user="철강영업팀 이수민"
          content="저도 모르겠어요ㅠ"
          createdAt="2024-05-07T09:01:24"
        />
      </div>

      <div className={styles.input}>
        <ChatBotInput />
      </div>
    </div>
  );
}
