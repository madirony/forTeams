import styles from "styles/template/mypageAllLogs.module.css";
import HistoryList from "component/historyList";
import MypageAllLogsDetail from "./mypageAllLogsDetail";
import { useEffect, useState } from "react";
import LocalStorage from "util/localStorage";
import Image from "next/image";

// API import
import { getChatLogList } from "apis/allLog";

export default function MypageAllLogs({ openModalShare, openModalSave }) {
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 챗봇 로그 전체 조회 API
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getChatLogList(userId).then((response) => {
      // console.log(response);
      setDatas(response);
    });
  }, []);

  // 상세 페이지 이동 위한 logId(chatbotUUID)
  const [logId, setLogId] = useState("");
  useEffect(() => {
    setLogId("");
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
        <>
          {datas ? (
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
            <>ddd</>
          )}
        </>
      )}
    </div>
  );
}
