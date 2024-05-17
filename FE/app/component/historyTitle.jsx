import { useRouter } from "next/navigation";
import styles from "styles/component/historyTitle.module.css";
import getDate from "util/getDate";
import BackArrow from "icon/backArrow.svg";
import ThreedotDropdown from "./threedotDropdown";
import Image from "next/image";
import { chatReload, loadChatLogs } from "apis/chatbot";

export default function HistoryTitle({
  title,
  updatedAt,
  setLogId,
  logId,
  openModalShare,
  openModalSave,
  chatbotChatUUID,
}) {
  // datetime 객체 변환하기
  const updateDate = updatedAt ? getDate(updatedAt) : null;

  // 라우터
  const router = useRouter();

  // 뒤로 가기 버튼
  const goBack = () => {
    setLogId();
  };

  // chatReload 호출
  const rewrite = () => {
    if (chatbotChatUUID) {
      chatReload(chatbotChatUUID)
        .then((response) => {
          console.log("[HistoryTitle] 채팅 다시쓰기", response);
          // 메인페이지로 이동
          router.push("/main");
          //
        })
        .catch((error) => {
          console.error("[HistoryTitle] Chat Reload Error", error);
        });
    } else {
      console.log("[HistoryTitle] Invalid chatUUID, cannot reload chat.");
    }
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
      {/* <p className={`${styles.date} ${styles.hiddenAtMiddle}`}>{updateDate}</p> */}
      {updateDate && (
        <p className={`${styles.date} ${styles.hiddenAtMiddle}`}>
          {updateDate}
        </p>
      )}
      <div style={{ cursor: "pointer" }}>
        <Image
          src="icon/rewrite.svg"
          alt="rewrite"
          width={20}
          height={20}
          onClick={rewrite}
        />
      </div>

      {openModalSave ? (
        <ThreedotDropdown
          trash
          share
          save
          openModalShare={openModalShare}
          openModalSave={openModalSave}
          logId={logId}
          setLogId={setLogId}
        />
      ) : (
        <ThreedotDropdown
          trash
          share
          openModalShare={openModalShare}
          logId={logId}
          setLogId={setLogId}
        />
      )}
    </div>
  );
}
