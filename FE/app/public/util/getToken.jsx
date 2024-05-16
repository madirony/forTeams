"use client";

import { useState } from "react";
import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

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
  console.log("accessToken :", accessToken);
  return accessToken;
};

// 미들웨어에서 읽어온 쿠키에서 ACCESS TOKEN을 분리하는 함수

// const getToken = (request) => {
//   const cookies = request.cookies;
//   const accessToken = cookies.get("ACCESS_TOKEN");
//   console.log("accessToken:", accessToken);
//   return accessToken;
// };

// jwt 라이브러리로 읽어온 ACCESS TOKEN을 파싱하는 함수
const decodeToken = () => {
  const accessToken = getToken();
  if (!accessToken) {
    console.log("accessToken이 없습니다");
    return null;
  }
  console.log("받아온 accessToken :", accessToken);

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
