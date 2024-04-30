import styles from "styles/template/mypageAllLogs.module.css";
import HistoryList from "component/historyList";

export default function MypageAllLogs() {
  // 챗봇 로그 전체 조회 API
  // 아래 예시는 API 호출 후 삭제
  const datas = [
    {
      id: 1,
      title: "내 계정에서 조직도 확인하기",
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
  ];
  // -------------------------------------

  return (
    <div className={styles.wrapper}>
      {datas.map((data, idx) => {
        return <HistoryList key={idx} data={data} />;
      })}
    </div>
  );
}
