import styles from "styles/template/mypageMyLogsDetail.module.css";
import HistoryTitle from "component/historyTitle";
import ThreedotDropdown from "component/threedotDropdown";

export default function MypageAllLogsDetail({
  logId,
  setLogId,
  openModalShare,
}) {
  // 챗봇 로그 상세 조회 API
  // 아래 예시는 API 호출 후 삭제
  const title = "내 계정에서 조직도 확인하기";
  const updatedAt = "2024-04-25T15:36:24";

  return (
    <div className={styles.wrapper}>
      <HistoryTitle title={title} updatedAt={updatedAt} setLogId={setLogId} />
      <div className={styles.dropdown}>
        <ThreedotDropdown trash share openModalShare={openModalShare} />
      </div>
      <div className={styles.logDetail}>{logId}번 챗봇 로그 상세 내용</div>
    </div>
  );
}
