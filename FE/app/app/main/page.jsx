"use client";

import styles from "styles/page/main.module.css";
import GetWindowSize from "util/getWindowSize";
import MenuBar from "component/menuBar.jsx";
import MainSwiper from "template/main/mainSwiper";
import ChatMain from "template/chat/chatMain";
import RecoFunctionMain from "template/recoFunction/recoFunctionMain";
import ChatBotMain from "template/chatBot/chatBotMain";
// import { useNavigate, useLocation } from "react-router-dom";

import { saveChatbot } from "apis/chatbot";

export default function Main() {
  // ★Local에서 사용자 정보를 조회해오기
  const userName = "이수민";
  const userDept = "철강영업팀";
  const userId = "123";

  // 윈도우 가로길이를 가져오기
  const { width } = GetWindowSize();
  // console.log("width:", width);

  // const location = useLocation();
  // useEffect(() => {
  //   const handleTransition = async () => {
  //     saveChatbot(userId).then((response) => {
  //       console.log("화면전환 리스폰스?", response);
  //     });
  //   };

  //   window.addEventListener("beforeunload", handleTransition);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleTransition);
  //   };
  // }, []);

  // 화면 전환 시 API 요청
  // useEffect(() => {
  //   const sendApiRequest = async () => {
  //     try {
  //       const response = await saveChatbot(userId);
  //       console.log("화면전환 리스폰스?", response);
  //     } catch (error) {
  //       console.error("API 요청 오류:", error);
  //     }
  //   };

  //   // 첫 로드 때는 API 요청을 보내지 않도록 설정
  //   sendApiRequest();
  // }, [location.pathname]); // 라우트 변경 감지

  return (
    <div className={styles.root}>
      <MenuBar userName={userName} userDept={userDept} userId={userId} />

      {width <= 500 ? (
        // 반응형-중간
        <div className={styles.swiperPage}>
          <MainSwiper />
        </div>
      ) : (
        // 반응형-데스크탑
        <div className={styles.largePage}>
          <div className={styles.sideWrapper}>
            <RecoFunctionMain />
            <ChatMain />
          </div>
          <div className={styles.mainWrapper}>
            <ChatBotMain />
          </div>
        </div>
      )}
    </div>
  );
}
