import axios from "util/baseAPI";

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

// 챗봇 응답 중단
const paushChatbot = async (userUUID) => {
  try {
    const response = await axios({
      method: "post",
      url: `/api/v1/chatbot/stop-stream/${userUUID}`,
    });
    console.log("챗봇 대화 중단 요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 대화 중단 요청 중 에러 발생", error);
  }
};

export { saveChatbot, paushChatbot };
