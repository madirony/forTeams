import styles from "styles/template/mypageMyLogs.module.css";
import HistoryList from "component/historyList";
import MypageMyLogsDetail from "./mypageMyLogsDetail";
import FolderIndex from "component/folderIndex";
import { useEffect, useState } from "react";

import { getFolders, getMyChatbotList } from "apis/save";

export default function MypageMyLogs({ openModalShare, openModalSave }) {
  // 상세 페이지 이동 위한 logId
  const [logId, setLogId] = useState();
  useEffect(() => {
    setLogId();
  }, []);

  // 폴더 목록 조회 API
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    getFolders().then((response) => {
      // response 형식
      // [
      //   { id: 3, name: "사용자 설정" },
      //   { id: 4, name: "외부사용자" },
      // ];
      // const folderNames = response.map((item) => item.name);
      setFolders(response);
    });
  }, []);

  // 마이 로그 전체 조회 API
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getMyChatbotList(3).then((response) => {
      console.log("폴더 저장 마이 로그 리스트 출력!", response);
      // setDatas(response)
    });
  }, []);

  const handleFolderSelect = (folderId) => {
    setSelectedFolder(folderId);
  };

  return (
    <div className={styles.wrapper}>
      {/* {logId ? (
        <MypageMyLogsDetail
          logId={logId}
          setLogId={setLogId}
          openModalShare={openModalShare}
          openModalSave={openModalSave}
        />
      ) : datas.length > 0 ? (
        <>
          <FolderIndex indexes={folders} />
          {datas.map((data, idx) => (
            <HistoryList key={idx} data={data} setLogId={setLogId} />
          ))}
        </>
      ) : (
        <div className={styles.textWrapper}>
          <p>새로운 질문을 저장해 보세요!</p>
        </div>
      )} */}
      {logId ? (
        <MypageMyLogsDetail
          logId={logId}
          setLogId={setLogId}
          openModalShare={openModalShare}
          openModalSave={openModalSave}
        />
      ) : (
        <>
          <FolderIndex
            indexes={folders}
            onFolderSelect={handleFolderSelect}
            selectedFolder={selectedFolder}
          />
          {/* {datas.map((data, idx) => (
            <HistoryList key={idx} data={data} setLogId={setLogId} />
          ))} */}
        </>
      )}
    </div>
  );
}
