"use client";

import { useState } from "react";
import styles from "styles/component/loginDropdownInput.module.css";
import Image from "next/image";

export default function LoginDropdownInput({
  selectedOption,
  setSelectedOption,
}) {
  // 드롭다운 옵션 리스트 정의
  const options = [
    { id: 0, name: "경영기획실" },
    { id: 1, name: "투자관리실" },
    { id: 2, name: "재무회계실" },
    { id: 3, name: "국제금융실" },
    { id: 4, name: "HR지원실" },
    { id: 5, name: "법무실" },
    { id: 6, name: "인프라지원실" },
    { id: 7, name: "커뮤니케이션실" },
    { id: 8, name: "열연사업실" },
    { id: 9, name: "조강선재사업실" },
    { id: 10, name: "에너지조선강재사업실" },
    { id: 11, name: "자동차강판사업실" },
    { id: 12, name: "전기전자사업실" },
    { id: 13, name: "박판사업실" },
    { id: 14, name: "강건재후판사업실" },
    { id: 15, name: "철강원료사업실" },
    { id: 16, name: "스테인리스사업실" },
    { id: 17, name: "E&P사업실" },
    { id: 18, name: "자원개발실" },
    { id: 19, name: "가스전운영실" },
    { id: 20, name: "에너지사업실" },
    { id: 21, name: "식량사업1실" },
    { id: 22, name: "식량사업2실" },
    { id: 23, name: "친환경소재사업실" },
    { id: 24, name: "모빌리티사업실" },
    { id: 25, name: "비철소재사업실" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // 옵션을 선택한 후 드롭다운을 닫음
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열림/닫힘 토글
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dropdownToggle}>
        <span
          className={
            Object.keys(selectedOption).length === 0
              ? styles.selectedOptionTextGrey
              : styles.selectedOptionTextBlack
          }
        >
          {Object.keys(selectedOption).length === 0
            ? "부서를 선택하세요"
            : selectedOption.name}
        </span>

        {isDropdownOpen ? (
          <Image
            src="icon/dropdownClose.svg"
            alt="DropdownClose"
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
              className={styles.dropdownItem}
              onClick={() => handleOptionSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
