import axios from "util/baseAPI";

// 챗봇 공유 링크 생성
const shareLink = async (chatbotChatUUID) => {
  try {
    const response = await axios({
      method: "post",
      url: `api/v1/chatbot/share/${chatbotChatUUID}`,
    });
    console.log("챗봇 공유 링크 생성 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("챗봇 공유 링크 생성 중 에러 발생", error);
  }
};

export { shareLink };
