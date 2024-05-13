import styles from "styles/component/chattingBubble.module.css";
import Image from "next/image";
import getDate from "util/getDate";

export default function ChattingBubble({ uuid, msgUuid, user, content, createdAt, handleReply, replyTo }) {
  let chatAt = getDate(createdAt);
  const userId = "666";

  if (userId === uuid) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.myName}>{user}</div>
        <div className={styles.myChatWrapper}>
          <span className={styles.text}>{chatAt}</span>
          <div className={`${styles.myChat} ${styles.text}`}>{replyTo && <div className={styles.text}>답장: {replyTo}</div>}{content}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.peopleName}>{user}</div>
        <div className={styles.peopleChatWrapper}>
          <div className={`${styles.peopleChat} ${styles.text}`}>{replyTo && <div className={styles.text}>답장: {replyTo}</div>}{content}</div>
          <span className={styles.text}>{chatAt}</span>
          <Image
            className={styles.replyButton}
            onClick={() => handleReply(msgUuid, user)}
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
