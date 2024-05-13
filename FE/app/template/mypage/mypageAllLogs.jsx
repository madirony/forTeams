import styles from "styles/template/mypageAllLogs.module.css";
import HistoryList from "component/historyList";
import MypageAllLogsDetail from "./mypageAllLogsDetail";
import { useEffect, useState } from "react";
import axios from "axios";

// API import
import { getChatLogList } from "apis/allLog";

export default function MypageMyLogs({ openModalShare, openModalSave }) {
  // const router = useRouter();

  // 챗봇 로그 전체 조회 API
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    // ★userUUID 불러오기 수정 필요
    const userUUID = 123;
    getChatLogList(userUUID).then((response) => {
      console.log(response);
      setDatas(response);
    });
  }, []);

  // 상세 페이지 이동 위한 logId
  const [logId, setLogId] = useState();
  useEffect(() => {
    setLogId();
  }, []);

  return (
    <div className={styles.wrapper}>
      {logId ? (
        <MypageAllLogsDetail
          logId={logId}
          setLogId={setLogId}
          openModalShare={openModalShare}
          openModalSave={openModalSave}
        />
      ) : (
        datas.map((data, idx) => {
          return <HistoryList key={idx} data={data} setLogId={setLogId} />;
        })
      )}
    </div>
  );
}
