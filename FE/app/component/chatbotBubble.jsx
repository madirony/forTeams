import Image from "next/image";
import styles from "styles/component/chatBotBubble.module.css";

export default function ChatBotBubble({ mode, message }) {
  if (mode === "BOT") {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nicknameBox}>
          <Image
            src="icon/smile.svg"
            alt="smile icon"
            width={24}
            height={24}
          ></Image>
          <p>Point Chat Bot</p>
        </div>
        <div className={styles.bubbleBox}>
          <div className={styles.chatbotBubble}>
            {message}
          </div>
        </div>
      </div>
    );
  } else if (mode === "USER") {
    return (
      <div className={styles.bubbleBox}>
        <div className={styles.userBubble}>
          {message}
        </div>
      </div>
    );
  }
  return null;
}


// import Image from "next/image";
// import styles from "styles/component/chatBotBubble.module.css";

// export default function ChatBotBubble({ mode }) {
//   switch (mode) {
//     case "BOT":
//       return (
//         <div className={styles.wrapper}>
//           <div className={styles.nicknameBox}>
//             <Image
//               src="icon/smile.svg"
//               alt="smile icon"
//               width={24}
//               height={24}
//             ></Image>
//             <p>Point Chat Bot</p>
//           </div>
//           <div className={styles.bubbleBox}>
//             <div className={styles.chatbotBubble}>
//               '사내협업’ 기능에 대해서 무엇이 궁금하신가요? 찾으시는 기능이
//               없으면 직접 채팅을 입력해 보세요!
//             </div>
//           </div>
//         </div>
//       );
//     case "USER":
//       return (
//         <div className={styles.bubbleBox}>
//           <div className={styles.userBubble}>
//             현대 비즈니스 환경에서 원격 작업이 증가함에 따라, 팀 간 협업 및
//             커뮤니케이션을 원활히 하기 위한 도구로 Microsoft Teams가 주목받고
//             있습니다. 이러한 원격 협업 도구의 중요성이 커지는 가운데, Teams는
//             어떻게 조직 내 협업 문화를 혁신하고 향상시키는 데 도움을 줄 수
//             있을까요? Teams가 제공하는 화상 회의, 채팅, 파일 공유 등의 기능을
//             효과적으로 활용하여 팀원 간의 소통과 협력을 강화하는 방법은
//             무엇일까요?
//           </div>
//         </div>
//       );
//     case "INDEX":
//       return (
//         <div className={styles.bubbleBox}>
//           <div className={styles.userBubble}>ooo</div>
//         </div>
//       );
//     default:
//       return <></>;
//   }
// }
