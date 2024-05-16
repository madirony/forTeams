import styles from "styles/template/mypageMyLogs.module.css";
import HistoryList from "component/historyList";
import MypageMyLogsDetail from "./mypageMyLogsDetail";
import FolderIndex from "component/folderIndex";
import { useEffect, useState } from "react";

import { getFolders, getMyChatbotList } from "apis/save";

export default function MypageAllLogs({ openModalShare, openModalSave }) {
  // const router = useRouter();

  // 상세 페이지 이동 위한 logId
  const [logId, setLogId] = useState();
  useEffect(() => {
    setLogId();
  }, []);

  // 폴더 목록 조회 API
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    getFolders().then((response) => {
      console.log("폴더 목록 출력 아자아자", response);
      const folderNames = response.map((item) => item.name);
      setFolders(folderNames);
    });
  }, []);

  // 마이 로그 전체 조회 API
  // const [datas, setDatas] = useState([]);
  // useEffect(() => {
  //   getMyChatbotList().then((response) => {
  //     console.log("폴더 저장 마이 로그 리스트 출력!", response);
  //   });
  // }, []);

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
      ) : (
        <>
          <FolderIndex indexes={folders} />
          {datas.map((data, idx) => (
            <HistoryList key={idx} data={data} setLogId={setLogId} />
          ))}
        </>
      )}
    </div>
  );
}