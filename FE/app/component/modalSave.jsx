import styles from "styles/modalSave.module.css";
import GradientButton from "./gradientButton";

export default function ModalSave({ chatbotid, openModalSave }) {
  return (
    <div className={styles.modalBackground} onClick={openModalSave}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>답변 저장하기</p>
        <p>제목</p>
        <p>폴더</p>
        <GradientButton mode={"TWO_BUTTONS"} />
      </div>
    </div>
  );
}
