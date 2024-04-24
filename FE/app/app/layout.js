import "styles/globals.css";
import LocalStorage from "util/localStorage";
import RecoilRootProvider from "util/recoilRootProvider";
import LoginMain from "./login/loginMain";

export const metadata = {
  title: "forTeams",
  description: "Business Productivity Tool for POSCO INTERNATIONAL",
};

// ★★★ 여기서 로그인 여부 확인해 분기 처리하기
const isLogined = true;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RecoilRootProvider>
          {isLogined ? (
            <body>{children}</body>
          ) : (
            <LoginMain>{children}</LoginMain>
          )}
        </RecoilRootProvider>
      </body>
    </html>
  );
}
