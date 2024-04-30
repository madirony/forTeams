import styles from "styles/component/chattingBubble.module.css";
import Image from "next/image";

// ★ 나중에 부모 div의 크기에 맞춰 peopleChat, myChat의 width 조정하기
export default function ChattingBubble({ uuid, user, content, createAt }) {
  const userId = 666;
  if (userId === uuid) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.myName}>{user}</div>
        <div className={styles.myChatWrapper}>
          <span className={styles.text}>{createAt}</span>
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
          <span className={styles.text}>{createAt}</span>
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
