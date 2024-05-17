"use client";

import { useState } from "react";
import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import LocalStorage from "./localStorage";

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
  // console.log("[getToken] accessToken :", accessToken);
  return accessToken;
};

// 미들웨어에서 읽어온 쿠키에서 ACCESS TOKEN을 분리하는 함수
// const getToken = (request) => {
//   const cookies = request.cookies;
//   const accessToken = cookies.get("ACCESS_TOKEN");
//   console.log("accessToken:", accessToken);
//   return accessToken;
// };

// jwt 라이브러리로 읽어온 ACCESS TOKEN을 파싱해서 로컬에 저장하는 함수
const saveToken = () => {
  const accessToken = getToken();
  if (!accessToken) {
    console.log("[decodeToken] accessToken이 없습니다");
    return null;
  }
  console.log("[decodeToken] 성공");
  // console.log("[decodeToken] 성공 :", accessToken);

  try {
    const decodedToken = jwtDecode(accessToken);
    const userID = decodedToken.sub;
    const userNickname = decodedToken.nickname;
    const userDept = decodedToken.dept;

    // 로컬에 userId, userName, userDept를 저장
    console.log(
      "사용자 정보를 로컬에 저장했습니다.",
      decodedToken,
      userID,
      userNickname,
      userDept,
    );

    LocalStorage.setItem("token", decodedToken);
    LocalStorage.setItem("userId", userID);
    LocalStorage.setItem("userNickname", userNickname);
    LocalStorage.setItem("userDept", userDept);

    return { userID, userNickname, userDept };
  } catch (error) {
    console.log("[decodeToken] 토큰 가져오기 실패 :", error);
    return null;
  }
};

export { getCookies, getToken, saveToken };
