import { useState } from "react";
import styles from "styles/component/smallIndex.module.css";

export default function SmallIndex({ indexes }) {
  // indexes 길이만큼 useState 변수 만들기
  const length = indexes.length;
  const defaultList = Array(length).fill(false);
  const [indexList, setIndexList] = useState(defaultList);

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
