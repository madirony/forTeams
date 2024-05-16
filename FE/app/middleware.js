import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // 쿠키를 확인하여 로그인 여부를 판단하고 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트
  const { cookies } = request;
  const authToken = cookies.get("ACCESS_TOKEN");
  console.log("미들웨어에서 authToken 확인", authToken);

  //   인증 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   인증된 사용자는 요청을 계속 처리
  //   return NextResponse.next();
  return NextResponse.redirect(new URL("/main", request.url));
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: "/:path*",
};
