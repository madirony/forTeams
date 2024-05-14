import styles from "styles/component/modalSave.module.css";
import GradientButton from "./gradientButton";
import Input from "./input";
import DropdownInput from "./dropdownInput";
import { useState } from "react";

// API import

export default function ModalSave({ chatbotid, openModalSave }) {
  // ★유저 uuid 조회
  const userId = "12345";

  // 제목과 폴더 정보 추적하기
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const folder = selectedOption.name;

  const handleInputTitle = (event) => {
    setTitle(event.target.value);
  };

  // 마이 챗봇 내역 저장 API

  return (
    <div className={styles.modalBackground} onClick={openModalSave}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* {`현재 제목은: ${title} /`} */}
        {/* {` 현재 폴더는: ${folder}`} */}
        <p className={styles.modalTitle}>답변 저장하기</p>
        <Input
          title={"제목"}
          placeholder={"제목을 입력하세요"}
          onChange={handleInputTitle}
          message={title}
          handleMessage={handleInputTitle}
        />
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownTitle}>
            <span>폴더</span>
            <span style={{ fontFamily: "font2", fontSize: "12px" }}>
              폴더는 5개까지만 생성 가능해요
            </span>
          </div>
          <DropdownInput
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <GradientButton
          mode={"TWO_BUTTONS"}
          onGrayButtonClick={openModalSave}
          onPurpleButtonClick={() => {
            console.log("저장 API 보내기");
          }}
        />
      </div>
    </div>
  );
}
