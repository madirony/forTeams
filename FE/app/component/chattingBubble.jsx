import styles from "styles/component/chattingBubble.module.css";
import Image from "next/image";
import getDate from "util/getDate";

export default function ChattingBubble({ uuid, user, content, createdAt }) {
  // 채팅이 올라온 시간
  let chatAt = getDate(createdAt);

  // 로컬에서 현재 사용자 uuid 조회
  const userId = 666;

  if (userId === uuid) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.myName}>{user}</div>
        <div className={styles.myChatWrapper}>
          <span className={styles.text}>{chatAt}</span>
          <div className={`${styles.myChat} ${styles.text}`}>{content}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.peopleName}>{user}</div>
        <div className={styles.peopleChatWrapper}>
          <div className={`${styles.peopleChat} ${styles.text}`}>{content}</div>
          <span className={styles.text}>{chatAt}</span>
          <Image
            className={styles.replyButton}
            onClick={() => {
              console.log("리플라이 버튼 클릭");
            }}
            src="icon/chattingReply.svg"
            alt="chatting reply icon"
            width={12}
            height={12}
          />
        </div>
      </div>
    );
  }
}
