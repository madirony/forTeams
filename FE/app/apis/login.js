// import axios from "util/baseAPI";
import axios from "axios";

// 로그인 추가 정보 입력
const addLoginInfo = async (userDept) => {
  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:8443/api/v1/auth/info?dept=${userDept}`,
    });
    console.log("로그인 추가 정보 입력 성공:", response.data);
    return response.data;
  } catch (error) {
    console.log("로그인 추가 정보 입력 에러: ", error);
  }
};

// 로그아웃
const logout = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `api/v1/auth/logout`,
    });
    console.log("로그아웃 요청 성공:", response.data);
    return response.data;
  } catch (error) {
    console.log("로그아웃 요청 에러:", error);
  }
};

export { addLoginInfo, logout };
