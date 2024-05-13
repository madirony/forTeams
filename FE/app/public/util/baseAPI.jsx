import axios from "axios";

// 추가적으로 params, headers를 지정할 수 있음.
// axios 인스턴스 생성
// baseURL은 서버의 기본 URL
const instance = axios.create({
  baseURL: "https://forteams.co.kr",
  // baseURL: "http://localhost:8080/",
  // withCredentials: true,
});

export default instance;
