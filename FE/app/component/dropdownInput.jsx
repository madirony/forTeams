"use client";

import styles from "styles/component/dropdownInput.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFolders } from "apis/save";

export default function DropdownInput() {
  //임의로 넣은 dropdown 옵션들
  // ★ 수정필요
  // const [options, setOptions] = useState([
  //   { id: 1, name: "Option 1" },
  //   { id: 2, name: "Option 2" },
  //   { id: 3, name: "Option 3" },
  // ]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        // const userId = await AsyncStorage.getItem("userId");
        const userId = "12345";
        await getFolders(userId).then((response) => {
          console.log("dropdownInput.jsx 컴포에서 api 호출", response);
          // setOptions()
        });
      } catch (error) {
        console.log("dropdownInput.jsx 컴포에서 에러 발생", error);
      }
    };
    getUserId();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
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
    }
  };

  return (
    <div>
      <div className={styles.dropdownToggle}>
        <span
          className={
            selectedOption
              ? styles.selectedOptionTextBlack
              : styles.selectedOptionTextGrey
          }
        >
          {selectedOption ? selectedOption.name : "폴더를 선택하세요"}
        </span>
        <Image
          src="icon/dropdown.svg"
          alt="Dropdown"
          width={20}
          height={20}
          onClick={toggleDropdown}
        ></Image>
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
              type="text"
              value={customInput}
              onChange={customInputChange}
              placeholder="폴더 생성"
              className={styles.input}
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
