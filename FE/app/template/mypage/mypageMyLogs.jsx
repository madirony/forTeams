import styles from "styles/template/mypageMyLogs.module.css";
import HistoryList from "component/historyList";
import MypageMyLogsDetail from "./mypageMyLogsDetail";
import SmallIndex from "component/smallIndex";
import { useEffect, useState } from "react";

export default function MypageAllLogs({ openModalShare, openModalSave }) {
  // const router = useRouter();

  // 상세 페이지 이동 위한 logId
  const [logId, setLogId] = useState();
  useEffect(() => {
    setLogId();
  }, []);

  // 마이 로그 전체 조회 API
  // 아래 예시는 API 호출 후 삭제
  const indexList = ["영상회의", "회의", "사용자설정", "사용자 지정 폴더"];

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
          <SmallIndex justifyTo={"flex-start"} indexList={indexList} />
          {datas.map((data, idx) => (
            <HistoryList key={idx} data={data} setLogId={setLogId} />
          ))}
        </>
      )}
    </div>
  );
}
