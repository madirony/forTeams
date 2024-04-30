"use client";

import Image from "next/image";

export default function MypageButton() {
  const onClick = () => {
    // ★ 버튼이 클릭되었을 때 로직 작성★
    console.log("마이페이지 버튼 클릭");
  };
  return (
    <div>
      <button onClick={onClick}>
        <Image
          src="icon/mypageButton.svg"
          alt="MypageButton"
          width={125}
          height={90}
        ></Image>
      </button>
    </div>
  );
}
