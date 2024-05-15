import axios from "util/baseAPI";

//현재 채팅의 UUID를 조회하는 GET API
//chatbotUUID가 MsUserUUID (임시로 123)
const getCurrentChatUUID = async (chatbotUUID) => {
  try {
    const response = await axios({
      method: "get",
      url: `api/v1/chatbot/chattingUUID/${chatbotUUID}`,
    });
    console.log("현재 채팅의 UUID를 조회 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("현재 채팅의 UUID를 조회 중 에러 발생", error);
  }
};

// ===========================
//  const [chatUUID, setChatUUID] = useState("");
//   useEffect(() => {
//     // ★userUUID 불러오기 수정 필요
//     const userUUID = 123;
//     getCurrentChatUUID(userUUID).then((response) => {
//       // console.log("하나둘셋얍", response.chatbotChatUUID);
//       setChatUUID(response.chatbotChatUUID);
//     });
//   }, []);
//   // console.log(chatUUID);
//   =====================

// 챗봇 세션 내역 저장
const saveChatbot = async (userUUID) => {
  try {
    const response = await axios({
      method: "post",
      url: "api/v1/chatbot/save",
      data: userUUID,
      headers: { "Content-Type": "text/plain" },
    });
    console.log("챗봇 세션 내역 저장 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 세션 내역 저장 중 에러 발생", error);
  }
};

// 챗봇 답변 중단
const pauseChatbot = async (userUUID) => {
  try {
    const response = await axios({
      method: "post",
      url: `api/v1/chatbot/stop-stream/${userUUID}`,
    });
    console.log("챗봇 대화 중단 api 요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 대화 중단 요청 중 에러 발생", error);
  }
};

//챗봇 이어쓰기를 위한 채팅 로딩
const chatReload = async (chatbotChatUUID) => {
  try {
    const response = await axios({
      method: "post",
      url: `api/v1/chatbot/load-chat/${chatbotChatUUID}`,
    });
    console.log("챗봇 이어쓰기를 위한 채팅 로딩 api 요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 이어쓰기를 위한 채팅 로딩 중 에러 발생", error);
  }
};

export { getCurrentChatUUID, saveChatbot, pauseChatbot, chatReload };
