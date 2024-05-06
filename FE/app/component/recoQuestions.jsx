import styles from "styles/component/recoQuestions.module.css";

// 유사도가 가장 높은 기능 3개만 추천
export default function RecoQuestions({ title, func }) {
  const onClick = () => {
   // 기능 추천 클릭 시 발생 로직 작성
   console.log('기능 추천 클릭!')
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.title} onClick={onClick}>{title}에서 {func} 어떻게 해?</p>
    </div>
  );
}

