import styles from "styles/page/main.module.css";
import MenuBar from "component/menuBar.jsx";

export default function Main() {
  // Local에서 사용자 정보를 조회해오기
  const userName = "이수민";
  const userDept = "철강영업팀";
  const userId = 66;

  return (
    <div className={styles.root}>
      <MenuBar userName={userName} userDept={userDept} userId={userId} />
      <div className={styles.content}>
        <div className={styles.sideWrapper}>Side Wrapper</div>
        <div className={styles.mainWrapper}>Main Wrapper</div>
      </div>
    </div>
  );
}
