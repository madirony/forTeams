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
      console.log("폴더 목록 출력 아자아자!", response);
      // response 형식
      // [
      //   { id: 3, name: "사용자 설정" },
      //   { id: 4, name: "외부사용자" },
      // ];
      const folderNames = response.map((item) => item.name);
      // setFolders(response);
    });
  }, []);

  // 마이 로그 전체 조회 API
  // const [datas, setDatas] = useState([]);
  // useEffect(() => {
  //   getMyChatbotList().then((response) => {
  //     console.log("폴더 저장 마이 로그 리스트 출력!", response);
  //   });
  // }, []);

  // const onFolderSelect = (folderId) => {
  //   getMyChatbotList(folderId).then((response) => {
  //     console.log(`폴더 ${folderId}의 로그 목록:`, response);
  //     setDatas(response);
  //   });
  // };

  const datas = [
    {
      id: 1,
      title: "내 계정에서 조직도 확인하기",
      category: "영상회의",
      updatedAt: "2024-04-25T15:36:24",
    },
    {
      id: 2,
      title: "외부 사람과 팀 회의 시작하기",
      updatedAt: "2024-04-28T16:24:24",
    },
    {
      id: 3,
      title: "외부 사람에게 조직도 공유하기",
      updatedAt: "2024-04-30T18:00:24",
    },
    {
      id: 4,
      title: "내 계정에서 조직도 확인하기",
      updatedAt: "2024-04-25T15:36:24",
    },
    {
      id: 5,
      title: "외부 사람과 팀 회의 시작하기",
      updatedAt: "2024-04-28T16:24:24",
    },
    {
      id: 6,
      title: "외부 사람에게 조직도 공유하기",
      updatedAt: "2024-04-30T18:00:24",
    },
    {
      id: 7,
      title: "내 계정에서 조직도 확인하기",
      updatedAt: "2024-04-25T15:36:24",
    },
    {
      id: 8,
      title: "외부 사람과 팀 회의 시작하기",
      updatedAt: "2024-04-28T16:24:24",
    },
    {
      id: 9,
      title: "외부 사람에게 조직도 공유하기",
      updatedAt: "2024-04-30T18:00:24",
    },
  ];
  // -------------------------------------

  return (
    <div className={styles.wrapper}>
      {logId ? (
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
      )}
    </div>
  );
}
