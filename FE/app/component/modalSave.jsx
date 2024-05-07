import styles from "styles/component/modalSave.module.css";
import GradientButton from "./gradientButton";
import Input from "./input";
import DropdownInput from "./dropdownInput";

export default function ModalSave({ chatbotid, openModalSave }) {
  return (
    <div className={styles.modalBackground} onClick={openModalSave}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modalTitle}>답변 저장하기</p>
        <Input title={"제목"} placeholder={"제목을 입력하세요"} />
        <div className={styles.dropdownContainer}>
          <p className={styles.title}>폴더</p>
          <DropdownInput />
        </div>
        <GradientButton mode={"TWO_BUTTONS"} />
      </div>
    </div>
  );
}
