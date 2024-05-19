"use client";

import styles from "styles/component/bigIndex.module.css";
import Image from "next/image";

export default function BigIndex({ pushToMessages }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div
          className={styles.button}
          onClick={() =>
            pushToMessages([
              { value: "1.1 설치하기" },
              { value: "1.2 로그인하기" },
              { value: "1.3 오류해결하기" },
            ])
          }
        >
          <Image
            src="icon/bigIndexPrepare.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          준비하기
        </div>
        <div
          className={styles.button}
          onClick={() =>
            pushToMessages([
              { value: "2.1 기본 설정하기" },
              { value: "2.2 Teams 화면 이해하기" },
              { value: "2.3 내 팀 만들기" },
              { value: "2.4 채널 만들기" },
              { value: "2.5 팀/채널 사용하기" },
            ])
          }
        >
          <Image
            src="icon/bigIndexStart.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          시작하기
        </div>
        <div
          className={styles.button}
          onClick={() =>
            pushToMessages([
              { value: "3.1 채팅하기" },
              { value: "3.2 회상회의 하기" },
            ])
          }
        >
          <Image
            src="icon/bigIndexCommunicate.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          소통하기
        </div>
      </div>
      <div className={styles.innerWrapper}>
        <div
          className={styles.button}
          onClick={() =>
            pushToMessages([
              { value: "4.1 조직도" },
              { value: "4.2 Planner 사용하기" },
              { value: "4.3 Office 문서 공유 및 동시 편집하기" },
              { value: "4.4 Calendar Pro로 일정 관리하기" },
            ])
          }
        >
          <Image
            src="icon/bigIndexWork.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          업무하기
        </div>
        <div
          className={styles.button}
          onClick={() =>
            pushToMessages([
              { value: "5.1 더 많은 App. 추가하기" },
              { value: "5.2 OneNote 활용하기" },
              { value: "5.3 Polls로 설문조사 만들기" },
            ])
          }
        >
          <Image
            src="icon/bigIndexExtra.svg"
            alt="big index external"
            width={37}
            height={37}
          />
          부가기능
        </div>
      </div>
    </div>
  );
}
