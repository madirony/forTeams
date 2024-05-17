import { useState } from "react";
import styles from "styles/component/folderIndex.module.css";

export default function FolderIndex({
  indexes,
  onFolderSelect,
  selectedFolder,
}) {
  // // 클릭하면 색상 변경하는 state 변수
  // const [isSelected, setIsSelected] = useState(false);
  // const toggleSelect = () => {
  //   setIsSelected(!isSelected);
  // };

  // console.log("indexes 뽑아볼게욤", indexes);

  return (
    <div className={styles.container}>
      {indexes.map((folder) => (
        <div
          key={folder.id}
          // className={isSelected ? styles.selectedBubble : styles.bubble}
          onClick={() => onFolderSelect(folder.id)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}
