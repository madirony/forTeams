// "use client";

// import {
//   Dropdown,
//   DropdownButton,
//   DropdownDivider,
//   DropdownItem,
// } from "@nextui-org/react";
// import { useState } from "react";

// export default function DropdownInput() {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const dropdownStyle = {
//     width: "200px", // 드롭다운의 너비
//     padding: "8px", // 내부 여백
//     border: "1px solid #ccc", // 테두리
//     borderRadius: "4px", // 테두리의 둥글기
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // 그림자
//   };

//   const options = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//   ];

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     console.log("Selected option:", option);
//   };

//   return (
//     <div style={dropdownStyle}>
//       {/* <p>폴더</p> */}

//       <Dropdown>
//         <DropdownItem onClick={() => handleOptionSelect(options[0])}>
//           {options[0].label}
//         </DropdownItem>
//         <DropdownItem onClick={() => handleOptionSelect(options[1])}>
//           {options[1].label}
//         </DropdownItem>
//         <DropdownItem onClick={() => handleOptionSelect(options[2])}>
//           {options[2].label}
//         </DropdownItem>
//       </Dropdown>
//     </div>
//   );
// }
