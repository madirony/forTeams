import { useState } from "react";
import styles from "styles/component/folderIndex.module.css";

export default function FolderIndex({ indexes }) {
  // 클릭하면 색상 변경하는 state 변수
  const [isSelected, setIsSelected] = useState(false);
  const toggleSelct = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className={styles.container}>
      {indexes.map((index, idx) => (
        <div
          key={idx}
          className={isSelected ? styles.selectedBubble : styles.bubble}
          onClick={toggleSelct}
        >
          {index}
        </div>
      ))}
    </div>
  );
}
