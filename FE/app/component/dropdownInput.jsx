"use client";

import { useEffect, useState } from "react";
import styles from "styles/component/dropdownInput.module.css";
import Image from "next/image";

// API import
import { getFolders, createFolder } from "apis/save";

export default function DropdownInput({ selectedOption, setSelectedOption }) {
  // 유저 uuid 조회
  const userId = "12345";

  // 폴더 목록 조회 API
  // const [options, setOptions] = useState([]);
  useEffect(() => {
    getFolders(userId).then((response) => {
      console.log("데이터 출력", response);
      // setFolders(response)
    });
  }, []);

  // 폴더 생성 API

  const options = [
    {
      id: 4,
      name: "폴더명",
    },
    {
      id: 5,
      name: "키키",
    },
    {
      id: 7,
      name: "키키",
    },
    {
      id: 8,
      name: "폴더명",
    },
    {
      id: 9,
      name: "폴더명",
    },
  ];

  // const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // 옵션을 선택한 후 드롭다운을 닫음
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열림/닫힘 토글
  };

  const customInputChange = (e) => {
    setCustomInput(e.target.value); // 사용자가 입력한 값을 상태에 업데이트
  };

  const onCustomInputChange = () => {
    if (customInput.trim() !== "") {
      // 입력값이 비어있지 않으면 새로운 옵션으로 추가
      const newOption = { id: options.length + 1, name: customInput };
      setSelectedOption(newOption);
      setIsDropdownOpen(false);

      // 폴더 생성 API 보내기
      createFolder(customInput, userId);
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
