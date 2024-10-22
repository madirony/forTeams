import styles from "styles/template/mypageAllLogs.module.css";
import HistoryList from "component/historyList";
import MypageAllLogsDetail from "./mypageAllLogsDetail";
import { useEffect, useState } from "react";
import LocalStorage from "util/localStorage";

// API import
import { getChatLogList } from "apis/allLog";

export default function MypageAllLogs({ openModalShare, openModalSave }) {
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 상세 페이지 이동 위한 logId(chatbotUUID)
  const [logId, setLogId] = useState("");
  useEffect(() => {
    setLogId("");
  }, []);

  // 챗봇 로그 전체 조회 API
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getChatLogList(userId).then((response) => {
      // console.log(response);
      setDatas(response);
    });
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
      ) : datas.length > 0 ? (
        datas.map((data, idx) => {
          return (
            <HistoryList
              key={idx}
              data={data}
              setLogId={() => setLogId(data.chatbotChatUUID)}
            />
          );
        })
      ) : (
        <div className={styles.textWrapper}>
          <p>챗봇에게 새로운 질문을 해 보세요!</p>
        </div>
      )}
    </div>
  );
}
