import styles from "styles/component/modalShare.module.css";
import GradientButton from "./gradientButton";
import { useEffect, useState } from "react";

import { shareLink } from "apis/share";

export default function ModalShare({ chatbotid, openModalShare }) {
  const [link, setLink] = useState("");
  console.log("모달쉐어에서 prop받은 chatbotid 가져오기", chatbotid);

  // 폐기
  // useEffect(() => {
  //   console.log("현재 chatbotid!!!!:", chatbotid);
  //   shareLink(chatbotid).then((response) => {
  //     console.log("modalshare에서 공유하기 링크 출력 뽑기", response);
  //     setLink(response);
  //   });
  // }, [chatbotid]);

  useEffect(() => {
    // 동적 URL 생성
    // const dynamicLink = `http://localhost:3000/share/${chatbotid}`;
    if (chatbotid) {
      console.log(chatbotid, "나와?");
      const dynamicLink = `https://forteams.co.kr/share/${chatbotid}`;
      setLink(dynamicLink);
    }
  }, [chatbotid]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("링크가 클립보드에 복사되었습니다.");
      },
      (err) => {
        console.error("클립보드 복사 실패:", err);
      },
    );
  };
  // 클립보드에 링크 복사
  const handleCopyLink = () => {
    copyToClipboard(link);
  };

  return (
    <div className={styles.modalBackground} onClick={openModalShare}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>답변 공유하기</p>
        <div className={styles.linkWrapper}>
          <div className={styles.linkInput}>{link}</div>
          <GradientButton
            w={"100px"}
            h={"100%"}
            mode={"ONE_BUTTON"}
            purpleButtonText={"링크복사"}
            onPurpleButtonClick={handleCopyLink}
          />
        </div>
      </div>
    </div>
  );
}
