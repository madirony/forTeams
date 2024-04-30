"use client";

import styles from "styles/component/dropdownInput.module.css";
import Image from "next/image";
import { useState } from "react";

export default function DropdownInput() {
  //임의로 넣은 dropdown 옵션들
  // ★ 수정필요
  const [options] = useState([
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ]);

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
      const newOption = { id: options.length + 1, label: customInput };
      setSelectedOption(newOption);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="dropdown">
      <div className={styles.dropdownToggle}>
        {selectedOption ? selectedOption.label : "폴더를 선택하세요"}
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
              {option.label}
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

// import React, { useState } from "react";
// import styles from "styles/component/dropdownInput.module.css";

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@nextui-org/react";

// export default function DropdownInput() {
//   const [selectedKeys, setSelectedKeys] = React.useState(
//     new Set(["폴더를 선택하세요"]),
//   );

//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
//     [selectedKeys],
//   );

//   return (
//     <Dropdown className={styles.dropdown}>
//       <DropdownTrigger>
//         <Button className={styles.button}>{selectedValue}</Button>
//       </DropdownTrigger>
//       <DropdownMenu
//         className={styles.dropdownMenu}
//         aria-label="Single selection example"
//         disallowEmptySelection
//         selectionMode="single"
//         selectedKeys={selectedKeys}
//         onSelectionChange={setSelectedKeys}
//       >
//         <DropdownItem key="text" className={styles.dropdownItem}>
//           Text
//         </DropdownItem>
//         <DropdownItem key="number" className={styles.dropdownItem}>
//           Number
//         </DropdownItem>
//         <DropdownItem key="date" className={styles.dropdownItem}>
//           Date
//         </DropdownItem>
//         <DropdownItem key="single_date" className={styles.dropdownItem}>
//           Single Date
//         </DropdownItem>
//         <DropdownItem key="iteration" className={styles.dropdownItem}>
//           Iteration
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
