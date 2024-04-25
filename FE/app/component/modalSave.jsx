import styles from "styles/modalSave.module.css";

export default function ModalSave({ openModalSave }) {
  // props로 전달받은 state 함수

  // if (!isOpen) {
  //   return null;
  // }

  return (
    <div className={styles.modalBackground} onClick={openModalSave}>
      <div className={styles.modal}>
        <p>모달</p>
        <p>모달</p>
      </div>
    </div>
  );
}
