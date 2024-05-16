import axios from "util/baseAPI";

//현재 채팅의 UUID를 조회하는 GET API
//chatbotUUID가 MsUserUUID (임시로 123)
const getCurrentChatUUID = async (chatbotUUID) => {
  try {
    const response = await axios({
      method: "get",
      url: `api/v1/chatbot/chattingUUID/${chatbotUUID}`,
    });
    console.log("getCurrentChatUUID 요청 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("getCurrentChatUUID 에러 발생", error);
  }
};

// 챗봇 세션 내역 저장
const saveChatbot = async (userUUID, chatUUID) => {
  try {
    const response = await axios({
      method: "post",
      url: "api/v1/chatbot/save",
      data: {
        userUUID: userUUID,
        chatUUID: chatUUID,
      },
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

// 현재 채팅 세션의 채팅 데이터를 불러오기
const loadChatLogs = async (chatbotChatUUID) => {
  try {
    const response = await axios({
      method: "get",
      url: `api/v1/chatbot/load-chatlogs/${chatbotChatUUID}`,
    });
    console.log(
      "현재 채팅 세션의 채팅 데이터를 불러오기 api 요청",
      response.data,
    );
    return response.data;
  } catch (error) {
    console.log("현재 채팅 세션의 채팅 데이터를 불러오기 중 에러 발생", error);
  }
};

export {
  getCurrentChatUUID,
  saveChatbot,
  pauseChatbot,
  chatReload,
  loadChatLogs,
};
