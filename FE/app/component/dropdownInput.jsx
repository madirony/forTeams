"use client";

import styles from "styles/component/dropdownInput.module.css";
import Image from "next/image";
import { useState } from "react";

export default function DropdownInput() {
  const [options] = useState([
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // 옵션을 선택한 후 드롭다운을 닫음
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열림/닫힘 토글
  };

  return (
    <div className="dropdown">
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : "폴더를 선택하세요"}
        <Image
          src="icon/dropdown.svg"
          alt="Dropdown"
          width={20}
          height={20}
        ></Image>
      </div>
      {isDropdownOpen && ( // 드롭다운이 열려 있을 때만 목록 표시
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li key={option.id} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
