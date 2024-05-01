import styles from "styles/component/historyTitle.module.css";
import BackArrow from "icon/backArrow.svg";
import { useRouter } from "next/navigation";

export default function HistoryTitle({ title, updatedAt, setLogId }) {
  const router = useRouter();

  // 뒤로 가기 버튼
  const goBack = () => {
    setLogId();
    // router.back();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.backButton} onClick={goBack}>
          <BackArrow width={"20px"} height={"20px"} />
          <p className={styles.hiddenAtMobile}>목록</p>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <p className={`${styles.date} ${styles.hiddenAtMiddle}`}>{updatedAt}</p>
    </div>
  );
}
