import axios from "util/baseAPI";

// 자주 찾는 기능 조회
const recoFunc = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "api/v1/chatbot/func",
    });
    console.log("자주 찾는 기능 조회 api요청", response);
    return response.data;
  } catch (error) {
    console.log("자주 찾는 기능 조회 중 에러 발생", error);
  }
};

export { recoFunc };
