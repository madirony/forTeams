import styles from "styles/component/modalSave.module.css";
import GradientButton from "./gradientButton";
import Input from "./input";
import DropdownInput from "./dropdownInput";
import { useState } from "react";

// API import
import { saveMyChatbot } from "apis/save";
import { getFolders } from "apis/save";

export default function ModalSave({ chatbotid, openModalSave }) {
  console.log("========이거야========", chatbotid);

  // 제목과 폴더 정보 추적하기
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const folder = selectedOption.name;
  const folderId = selectedOption.id;

  const handleInputTitle = (event) => {
    setTitle(event.target.value);
  };

  // // 폴더 목록 조회 API
  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //   getFolders().then((response) => {
  //     // console.log("폴더 목록 출력!!", response);
  //     setOptions(response);
  //   });
  // }, []);

  // 마이 챗봇 내역 저장 API 호출 함수
  const handleSave = () => {
    console.log("챗봇아이디뽑", chatbotid);
    saveMyChatbot(folderId, chatbotid, title)
      .then((response) => {
        console.log("저장 성공:", response);
        openModalSave(); // 모달 닫기
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  return (
    <div className={styles.modalBackground} onClick={openModalSave}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* {`현재 제목은: ${title}`}
        {` 현재 폴더는: ${folder}`}
        {` 현재 폴더 id: ${folderId}`} */}
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
            handleSave();
            // console.log("클릭..!");
          }}
        />
      </div>
    </div>
  );
}
