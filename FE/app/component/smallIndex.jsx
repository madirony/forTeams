import { useState } from "react";
import styles from "styles/component/smallIndex.module.css";

const initialIndexes = [
  {
    value: "1.1 설치하기",
  },
  {
    value: "1.2 로그인하기",
  },
  {
    value: "1.3 오류 해결하기",
  },
  {
    value: "2.1 기본 설정하기",
    children: [
      { value: "2.1.1 자동 시작" },
      { value: "2.1.2 채팅 및 활동 알림 삭제" },
    ],
  },
  {
    value: "2.2 Teams 화면 이해하기",
    children: [{ value: "2.2.1 Teams 팀, 채널 개념 이해하기" }],
  },
  {
    value: "2.3 내 팀 만들기",
    children: [{ value: "2.3.1 팀에 구성원 초대" }],
  },
  {
    value: "2.4 채널 만들기",
  },
  {
    value: "2.5 팀/채널 사용하기",
    children: [{ value: "2.5.1 기본 기능" }, { value: "2.5.2 App. 추가" }],
  },
  {
    value: "3.1 채팅하기",
    children: [
      { value: "3.1.1 Teams 사용 그룹사 직원과 채팅" },
      { value: "3.1.2 Teams 미사용 그룹사 직원 및 외부인과 채팅" },
    ],
  },
  {
    value: "3.2 회상회의 하기",
    children: [
      {
        value: "3.2.1 화상회의 개설",
        children: [
          { value: "3.2.1.1 팀/채널에서 회의 예약" },
          { value: "3.2.1.2 채팅에서 회의 예약" },
          { value: "3.2.1.3 일정 App. 에서 회의 예약" },
        ],
      },
      {
        value: "3.2.2 참석자 초대하기",
        children: [
          { value: "3.2.2.1 Teams 사용자 초대 " },
          { value: "3.2.2.2 Teams 미사용자 초대" },
        ],
      },
      { value: "3.2.3 화상회의 부가기능" },
    ],
  },
  {
    value: "4.1 조직도",
    children: [
      { value: "4.1.1 업무 상태 표시 및 확인" },
      { value: "4.1.2 조직도에서 채팅" },
      { value: "4.1.3 조직도에서 팀/채널 생성 및 구성원 추가" },
    ],
  },
  {
    value: "4.2 Planner 사용하기",
    children: [
      { value: "4.2.1 조직 Planner" },
      { value: "4.2.2 개인 Planner" },
    ],
  },
  {
    value: "4.3 Office 문서 공유 및 동시 편집하기",
  },
  {
    value: "4.4 Calendar Pro로 일정 관리하기",
  },
  {
    value: "5.1 더 많은 App. 추가하기",
  },
  {
    value: "5.2 OneNote 활용하기",
  },
  {
    value: "5.3 Polls로 설문조사 만들기",
  },
];

// 자식 인덱스를 찾는 함수
const findChildren = (list, targetValue) => {
  for (const item of list) {
    if (item.value === targetValue) return item.children || [];
    if (item.children) {
      const result = findChildren(item.children, targetValue);
      if (result.length) return result;
    }
  }
  return [];
};

// 재귀적 SmallIndex 컴포넌트
export default function SmallIndex({
  indexes,
  sendIndexMessage,
  pushToMessages,
}) {
  // indexes 길이만큼 state 변수 선언하기
  const [selected, setSelected] = useState("");

  // 인덱스를 클릭했을 때 색 변경하고 재 요청 보내는 함수
  const onClickIndex = (value) => {
    // console.log("원래 밸류", value);

    setSelected(value); // 클릭한 인덱스로 selected 변경
    // console.log("selected 변경", selected, "끝");

    const children = findChildren(initialIndexes, value); // selected의 children 검색
    // console.log("children", children);

    if (children.length === 0) {
      // 자식이 없으면 메시지 전송
      sendIndexMessage(value);
      // console.log("메시지 전송함", value);
    } else {
      // 자식이 있으면 getIndex 함수를 호출
      pushToMessages(children);
    }
  };

  return (
    <div className={styles.container}>
      {indexes.map((index, idx) => (
        <div key={idx}>
          {/* SmallIndex를 띄우는 부분 */}
          <div
            className={
              index.value === selected ? styles.selectedBubble : styles.bubble
            }
            onClick={() => onClickIndex(index.value)}
          >
            {index.value}
          </div>
        </div>
      ))}
    </div>
  );
}
