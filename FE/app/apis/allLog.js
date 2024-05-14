import axios from "util/baseAPI";

//챗봇 로그 UUID 목록 조회
const getChatLogList = async (userUUID) => {
  try {
    const response = await axios.get(`api/v1/chatbot/saved-chats/${userUUID}`);
    console.log("서버 응답 옴?", response.data);
    return response.data;
  } catch (error) {
    console.error("챗봇 로그 UUID 목록 조회 실패", error);
  }
};

//챗봇 로그 상세 조회
const getChatLogDetail = async (chatbotChatUUID) => {
  try {
    const response = await axios({
      method: "get",
      url: `api/v1/chatbot/saved-chats/detail/${chatbotChatUUID}`,
    });
    console.log("챗봇 로그 상세 조회 api 요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 로그 상세 조회 중 에러 발생", error);
  }
};
export { getChatLogList, getChatLogDetail };
