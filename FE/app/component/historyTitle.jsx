import { useRouter } from "next/navigation";
import styles from "styles/component/historyTitle.module.css";
import getDate from "util/getDate";
import BackArrow from "icon/backArrow.svg";
import ThreedotDropdown from "./threedotDropdown";

export default function HistoryTitle({
  title,
  updatedAt,
  setLogId,
  logId,
  openModalShare,
  openModalSave,
}) {
  // datetime 객체 변환하기
  const updateDate = getDate(updatedAt);

  // 라우터
  const router = useRouter();

  // 뒤로 가기 버튼
  const goBack = () => {
    setLogId();
    // router.back();
  };
  // console.log("??ddddd?", logId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.backButton} onClick={goBack}>
          <BackArrow width={"20px"} height={"20px"} />
          <p className={styles.hiddenAtMobile}>목록</p>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <p className={`${styles.date} ${styles.hiddenAtMiddle}`}>{updateDate}</p>
      {openModalSave ? (
        <ThreedotDropdown
          trash
          share
          save
          openModalShare={openModalShare}
          openModalSave={openModalSave}
          logId={logId}
        />
      ) : (
        <ThreedotDropdown
          trash
          share
          openModalShare={openModalShare}
          logId={logId}
        />
      )}
    </div>
  );
}
