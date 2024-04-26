import styles from "styles/modalShare.module.css";
import GradientButton from "./gradientButton";

export default function ModalShare({ chatbotid, openModalShare }) {
  return (
    <div className={styles.modalBackground} onClick={openModalShare}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>답변 공유하기</p>
        <div className={styles.linkWrapper}>
          <div className={styles.linkInput}>{"http://naver.com"}</div>
          <GradientButton
            w={"100px"}
            mode={"ONE_BUTTON"}
            purpleButtonText={"링크복사"}
          />
        </div>
      </div>
    </div>
  );
}
