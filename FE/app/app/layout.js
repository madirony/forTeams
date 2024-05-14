import "styles/globals.css";
import LocalStorage from "util/localStorage";
import Head from "next/head";
import RecoilRootProvider from "util/recoilRootProvider";
import LoginMain from "./login/page";
import { getCookies, GetIsLogined } from "util/getToken";

export const metadata = {
  title: "forTeams",
  description: "Business Productivity Tool for POSCO INTERNATIONAL",
};

// ★★★ 여기서 로그인 여부 확인해 분기 처리하기
// local storage에서 사용자 토큰 확인하기
// const isLogined = true;
const isLogined = GetIsLogined;
console.log("메인 페이지에서 isLogined 상태 :", isLogined);

// getCookies();
// if (getCookies.sub) {
//   let isLogined = true;
// } else {
//   isLogined = false;
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RecoilRootProvider>
        {isLogined ? (
          <body>{children}</body>
        ) : (
          <body>
            <LoginMain>{children}</LoginMain>
          </body>
        )}
      </RecoilRootProvider>
    </html>
  );
}
