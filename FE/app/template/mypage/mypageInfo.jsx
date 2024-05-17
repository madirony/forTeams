import styles from "styles/template/mypageInfo.module.css";
import LocalStorage from "util/localStorage";
import { useState } from "react";
import Input from "component/input";
import GradientButton from "component/gradientButton";
import LoginDropdownInput from "component/loginDropdownInput";

export default function MypageInfo() {
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 드롭다운 정의 ===========================================================
  const [selectedOption, setSelectedOption] = useState({});

  return (
    <div className={styles.wrapper}>
      <Input title={"닉네임"} message={userNickname} readonly />

      <Input title={"부서"} message={userDept} readonly />
      <LoginDropdownInput
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* 수정 버튼은 일단 삭제 */}
      <div className={styles.button}>
        <GradientButton mode={"ONE_BUTTON"} purpleButtonText={"완료"} />
      </div>
    </div>
  );
}
