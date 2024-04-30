import styles from "styles/component/historyTitle.module.css";
import BackArrow from "icon/backArrow.svg";

export default function HistoryTitle({ title, createdAt }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.backButton}>
          <BackArrow width={"20px"} height={"20px"} />
          <p className={styles.hiddenAtMobile}>목록</p>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <p className={`${styles.date} ${styles.hiddenAtMiddle}`}>{createdAt}</p>
    </div>
  );
}
