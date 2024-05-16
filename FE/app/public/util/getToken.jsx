"use client";

// SSR 쿠키에서 토큰을 읽어오는 함수
// const getCookies = () => {
//   const cookieStore = cookies().getAll();
//   console.log("모든 쿠키 :", cookieStore);
// };

import { useState } from "react";

// CSR 쿠키에서 전체 쿠키를 읽어오는 함수
const getCookies = () => {
  const cookies = document.cookie.split(";");
  const cookieObj = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObj[name.trim()] = value ? decodeURIComponent(value.trim()) : "";
  });
  // console.log("일단 쿠키 가져오기", cookieObj);
  // {TMP_ACCESS: '661434ac-a022-4b8e-b51b-a001a9854ccf',
  // ACCESS_TOKEN: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NjE0MzRhYy1hMDIyL…AqkxEBeKRWf1pBb4lTRp4jPW_3LllMLujp8scZmW1mCQNV_lg'}
  return cookieObj;
};

// 읽어온 쿠키에서 ACCESS TOKEN을 분리하는 함수
const getToken = () => {
  const cookieObj = getCookies();
  const accessToken = cookieObj.ACCESS_TOKEN;
  console.log("token :", accessToken);
  return accessToken;
  // console.log("getIsLogined 실행", prev);
  // return !prev;
};

// jwt 라이브러리로 읽어온 ACCESS TOKEN을 파싱하는 함수
const decodeToken = () => {
  const accessToken = getToken();

  try {
    const decodedToken = jwtDecode(accessToken);
    const userID = decodedToken.sub;
    const userName = decodedToken.nickname;
    const userDept = decodedToken.dept;
    console.log(
      "userID :",
      userID,
      "/",
      "userName :",
      userName,
      "/",
      "userDept :",
      userDept,
    );
    return { userID, userName, userDept };
  } catch (error) {
    console.log("토큰 가져오기 실패 :", error);
    return null;
  }
};

export { getCookies, getToken, decodeToken };
