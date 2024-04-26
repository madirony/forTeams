import styles from "styles/gradientButton.module.css";

export default function GradientButton({
  w,
  h,
  mode,
  grayButtonText,
  purpleButtonText,
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
            onClick={() => console.log("회색 버튼 컴포넌트")}
          >
            {grayButtonText ? grayButtonText : "취소"}
          </button>

          <button
            className={styles.purpleButton}
            onClick={() => console.log("보라색 버튼 컴포넌트")}
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
            onClick={() => console.log("보라색 버튼 컴포넌트")}
          >
            {purpleButtonText ? purpleButtonText : "완료"}
          </button>
        </div>
      );
    default:
      return <></>;
  }
}
