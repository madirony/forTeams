import styles from "styles/template/mypageAllLogsDetail.module.css";
import HistoryTitle from "component/historyTitle";
import ThreedotDropdown from "component/threedotDropdown";

export default function MypageMyLogsDetail({
  logId,
  setLogId,
  openModalShare,
  openModalSave,
}) {
  // 챗봇 로그 상세 조회 API
  // 아래 예시는 API 호출 후 삭제
  const title = "내 계정에서 조직도 확인하기";
  const updatedAt = "2024-04-25T15:36:24";

  return (
    <div className={styles.wrapper}>
      <HistoryTitle
        title={title}
        updatedAt={updatedAt}
        setLogId={setLogId}
        openModalShare={openModalShare}
        openModalSave={openModalSave}
      />

      <div className={styles.logDetail}>{logId}번 챗봇 로그 상세 내용</div>
    </div>
  );
}
