import axios from "util/baseAPI";

// 로그인 추가 정보 입력
const addLoginInfo = async (userDept) => {
  try {
    const response = await axios({
      method: "post",
      url: `/api/v1/auth/info?dept=${userDept}`,
    });
    console.log("로그인 추가 정보 입력 성공:", response.data);
    return response.data;
  } catch (error) {
    console.log("로그인 추가 정보 입력 에러: ", error);
  }
};

export { addLoginInfo };
