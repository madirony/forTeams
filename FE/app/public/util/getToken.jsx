"use client";

// SSR 쿠키에서 토큰을 읽어오는 함수
// const getCookies = () => {
//   const cookieStore = cookies().getAll();
//   console.log("모든 쿠키 :", cookieStore);
// };

import { useState } from "react";

// CSR 쿠키에서 토큰을 읽어오는 함수
const getCookies = () => {
  const cookies = document.cookie.split(";");
  const cookieObj = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObj[name.trim()] = value ? decodeURIComponent(value.trim()) : "";
  });
  console.log("일단 쿠키", cookieObj);
  return cookieObj;
};

// jwt 라이브러리로 읽어온 토큰을 파싱하는 함수
// const decodeToken = () => {
//   try {
//     const decodedToken = jwtDecode(accessToken);
//     const userID = decodedToken.sub;
//     const userName = decodedToken.nickname;
//     const userDept = decodedToken.dept;
//     return { userID, userName, userDept };
//   } catch (error) {
//     console.log("토큰 가져오기 실패 :", error);
//     return null;
//   }
// };

const GetIsLogined = () => {
  const [isLogined, setIsLogined] = useState(false);

  const cookieObj = getCookies();
  {
    cookieObj.ACCESS_TOKEN ? setIsLogined(true) : null;
  }
  console.log("get is logined 들어오긴 함 :", isLogined);
  return isLogined;
};

export { getCookies, GetIsLogined };
