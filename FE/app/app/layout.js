import "./globals.css";
import RecoilRootProvider from "@/public/util/recoilRootProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "forTeams",
  description: "Business Productivity Tool for POSCO INTERNATIONAL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
