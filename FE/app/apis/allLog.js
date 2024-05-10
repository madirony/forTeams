import axios from "util/baseAPI";

//챗봇 로그 UUID 목록 조회
const getChatLogList = async (userUUID) => {
  try {
    const response = await axios({
      method: "get",
      url: `api/v1/chatbot/saved-chats/${userUUID}`,
    });
    console.log("챗봇 로그 UUID 목록 조회 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 로그 UUID 목록 조회 중 에러 발생!!!", error);
  }
};

export { getChatLogList };
