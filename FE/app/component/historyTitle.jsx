import styles from "styles/historyTitle.module.css";
import BackArrow from "icon/backArrow.svg";

export default function HistoryTitle({ title, createdAt }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backButton}>
        <BackArrow width={"20px"} height={"20px"} />
        <p>목록</p>
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.date}>{createdAt}</p>
    </div>
  );
}
