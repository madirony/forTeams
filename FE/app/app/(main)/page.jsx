import styles from "styles/page/main.module.css";
import MenuBar from "component/menuBar.jsx";
import MainSwiper from "template/main/mainSwiper";
import ChatMain from "template/chat/chatMain";
import RecoFunctionMain from "template/recoFunction/recoFunctionMain";
import ChatBotMain from "template/chatBot/chatBotMain";

export default function Main() {
  // Local에서 사용자 정보를 조회해오기
  const userName = "이수민";
  const userDept = "철강영업팀";
  const userId = 66;

  return (
    <div className={styles.root}>
      <MenuBar userName={userName} userDept={userDept} userId={userId} />

      {/* 반응형-데스크탑 */}
      <div className={styles.largePage}>
        <div className={styles.sideWrapper}>
          <RecoFunctionMain />
          <ChatMain />
        </div>
        <div className={styles.mainWrapper}>
          <ChatBotMain />
        </div>
      </div>

      {/* 반응형-중간 */}
      <div className={styles.swiperPage}>
        <MainSwiper />
      </div>
    </div>
  );
}
