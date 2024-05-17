"use client";

import { useEffect, useState } from "react";
import styles from "styles/component/dropdownInput.module.css";
import Image from "next/image";

// API import
import { getFolders, createFolder } from "apis/save";

export default function DropdownInput({ selectedOption, setSelectedOption }) {
  // import 페이지에서 정의 : const [selectedOption, setSelectedOption] = useState({})
  console.log("selectedOption 뽑뽑", selectedOption);

  // const [selectedId, setSelectedId] = useState("");

  // 폴더 목록 조회 API
  const [options, setOptions] = useState([]);
  // useEffect(() => {
  //   getFolders().then((response) => {
  //     console.log("폴더 목록 출력~!!", response);
  //     setOptions(response);
  //   });
  // }, []);
  const fetchFolders = async () => {
    try {
      const response = await getFolders();
      // console.log("폴더 목록 출력~!!", response);
      setOptions(response);
    } catch (error) {
      console.error("폴더 목록 조회 중 에러 발생", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // console.log("selectedOption이 뭐가 나옴?", selectedOption);
    setIsDropdownOpen(false); // 옵션을 선택한 후 드롭다운을 닫음
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열림/닫힘 토글
  };

  const customInputChange = (e) => {
    setCustomInput(e.target.value); // 사용자가 입력한 값을 상태에 업데이트
  };

  const onCustomInputChange = async () => {
    if (customInput.trim() !== "") {
      try {
        // 폴더 생성 API 보내기
        await createFolder(customInput);
        console.log("새 폴더 생성 완료?");
        // 폴더 목록 다시 불러오기
        await fetchFolders();
        setCustomInput(""); // 입력 필드 초기화
        // setIsDropdownOpen(false); // 드롭다운 닫기
      } catch (error) {
        console.error("폴더 생성 중 에러 발생", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.dropdownToggle}>
        <span
          className={
            Object.keys(selectedOption).length === 0
              ? styles.selectedOptionTextGrey
              : styles.selectedOptionTextBlack
          }
        >
          {Object.keys(selectedOption).length === 0
            ? "폴더를 선택하세요"
            : selectedOption.name}
        </span>

        {isDropdownOpen ? (
          <Image
            src="icon/dropdownClose.svg"
            alt="Dropdown"
            width={20}
            height={20}
            onClick={toggleDropdown}
          ></Image>
        ) : (
          <Image
            src="icon/dropdown.svg"
            alt="Dropdown"
            width={20}
            height={20}
            onClick={toggleDropdown}
          ></Image>
        )}
      </div>

      {isDropdownOpen && ( // 드롭다운이 열려 있을 때만 목록 표시
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className={styles.dropdownItem}
            >
              {option.name}
            </li>
          ))}

          {/* 사용자 직접 입력 */}
          <li className={styles.dropdownItem}>
            <input
              className={styles.input}
              type="text"
              value={customInput}
              onChange={customInputChange}
              placeholder="폴더 생성"
            />
            <button onClick={onCustomInputChange}>
              <Image
                src="icon/plus.svg"
                alt="Plus"
                width={20}
                height={20}
              ></Image>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
