import styles from "styles/template/mypageInfo.module.css";
import LocalStorage from "util/localStorage";
import { useEffect, useState } from "react";
import Input from "component/input";
import GradientButton from "component/gradientButton";
import LoginDropdownInput from "component/loginDropdownInput";
import updateDept from "apis/login";

export default function MypageInfo() {
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 드롭다운 정의 ===========================================================
  const [selectedOption, setSelectedOption] = useState({});
  const [toApi, setToApi] = useState("");

  useEffect(() => {
    if (selectedOption.name) {
      setToApi(selectedOption.name);
    }
  }, [selectedOption]);

  // 완료 버튼 눌렀을 때 실행될 함수
  const onClickButton = () => {
    updateDept(userId, toApi)
      .then((response) => {
        console.log("수정 요청 성공");
      })
      .catch(() => {
        console.log("실행 안됨");
      });
  };

  return (
    <div className={styles.wrapper}>
      <Input title={"닉네임"} message={userNickname} readonly />
      <Input title={"부서"} message={userDept} readonly />
      수정할 부서를 선택하고 완료 버튼을 눌러주세요 {selectedOption.name}
      <LoginDropdownInput
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {/* 수정 버튼은 일단 삭제 */}
      <div className={styles.button}>
        <GradientButton
          mode={"ONE_BUTTON"}
          purpleButtonText={"완료"}
          onPurpleButtonClick={onClickButton}
        />
      </div>
    </div>
  );
}
