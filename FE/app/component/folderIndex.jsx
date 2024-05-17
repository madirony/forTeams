import { useState } from "react";
import styles from "styles/component/folderIndex.module.css";

export default function FolderIndex({
  indexes,
  onFolderSelect,
  selectedFolder,
}) {
  // console.log("indexes 뽑아볼게욤", indexes);

  return (
    <div className={styles.container}>
      {indexes.map((folder) => (
        <div
          key={folder.id}
          className={
            folder.id === selectedFolder ? styles.selectedBubble : styles.bubble
          }
          // className={isSelected ? styles.selectedBubble : styles.bubble}
          onClick={() => onFolderSelect(folder.id)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}
