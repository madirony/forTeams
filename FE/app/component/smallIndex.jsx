import { useState } from "react";
import styles from "styles/component/smallIndex.module.css";

export default function SmallIndex({ justifyTo, indexList }) {
  // 좌우 정렬 변경 위한 속성
  const justifyIndexes = {
    "--justifyTo": justifyTo,
  };

  // 클릭하면 색상 변경하는 state 변수
  const [isSelected, setIsSelected] = useState(false);
  const toggleSelct = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div style={justifyIndexes} className={styles.container}>
      {indexList.map((index, idx) => (
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
