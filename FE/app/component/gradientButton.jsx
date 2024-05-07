import styles from "styles/component/gradientButton.module.css";

export default function GradientButton({
  w,
  h,
  mode,
  grayButtonText,
  purpleButtonText,
  onGrayButtonClick,
  onPurpleButtonClick
}) {
  const wrapperSize = {
    "--wrapperWidth": w,
    "--wrapperHeight": h,
  };
  switch (mode) {
    case "TWO_BUTTONS":
      return (
        <div style={wrapperSize} className={styles.wrapper}>
          <button
            className={styles.grayButton}
            // onClick={() => console.log("회색 버튼 컴포넌트")}
            onClick={onGrayButtonClick}
          >
            {grayButtonText ? grayButtonText : "취소"}
          </button>

          <button
            className={styles.purpleButton}
            // onClick={() => console.log("보라색 버튼 컴포넌트")}
            onClick={onPurpleButtonClick}
          >
            {purpleButtonText ? purpleButtonText : "완료"}
          </button>
        </div>
      );
    case "ONE_BUTTON":
      return (
        <div style={wrapperSize} className={styles.wrapper}>
          <button
            className={styles.purpleButton}
            // onClick={() => console.log("보라색 버튼 컴포넌트")}
            onClick={onPurpleButtonClick}
          >
            {purpleButtonText ? purpleButtonText : "완료"}
          </button>
        </div>
      );
    default:
      return <></>;
  }
}
