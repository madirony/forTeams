import styles from "styles/template/mypageInfo.module.css";
import LocalStorage from "util/localStorage";
import { useEffect, useState } from "react";
import Input from "component/input";
import GradientButton from "component/gradientButton";
import LoginDropdownInput from "component/loginDropdownInput";
import { updateDept } from "apis/login";

export default function MypageInfo() {
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 드롭다운 정의 ===========================================================
  const [selectedOption, setSelectedOption] = useState({});
  const [toApiDept, setToApiDept] = useState("");

  useEffect(() => {
    if (selectedOption.name) {
      setToApiDept(selectedOption.name);
    }
  }, [selectedOption]);

  // 완료 버튼 눌렀을 때 실행될 함수
  const onClickButton = () => {
    updateDept(userId, toApiDept)
      .then((response) => {
        // 변경되면 로컬에 업데이트
        LocalStorage.setItem("userDept", toApiDept);
      })
      .catch(() => {});
  };

  return (
    <div className={styles.wrapper}>
      <Input title={"닉네임"} message={userNickname} readonly />
      <Input title={"부서"} message={userDept} readonly />
      {/* 수정 버튼은 일단 삭제 */}
      수정할 부서를 선택하고 완료 버튼을 눌러주세요 {selectedOption.name}
      <LoginDropdownInput
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
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
