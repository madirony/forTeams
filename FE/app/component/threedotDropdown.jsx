"use client";

import { useState } from "react";
import styles from "styles/component/threedotDropdown.module.css";
import Image from "next/image";
import ThreeReset from "icon/threeReset.svg";
import ThreeTrash from "icon/threeTrash.svg";
import ThreeShare from "icon/threeShare.svg";
import ThreeSave from "icon/threeSave.svg";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { deleteChatLog } from "apis/allLog";

export default function ThreedotDropdown({
  reset,
  trash,
  share,
  save,
  openModalShare,
  openModalSave,
  logId,
  setLogId,
}) {
  // console.log("??threedot에서???", logId);

  const handleDelete = async () => {
    try {
      const response = await deleteChatLog(logId);
      console.log("삭제 성공:", response);
      // 전 페이지로 보내기
      // setLogId("");
      window.location.reload();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          className={styles.image}
          src="icon/threeDot.svg"
          alt="three dot"
          width={30}
          height={30}
        />
      </DropdownTrigger>
      <DropdownMenu className={styles.dropdownMenu} aria-label="Static Actions">
        {reset && (
          <DropdownItem
            className={styles.dropdownItem}
            key="reset"
            startContent={<ThreeReset />}
            onClick={() => console.log("화면초기화 버튼")}
          >
            화면초기화
          </DropdownItem>
        )}
        {trash && (
          <DropdownItem
            className={styles.dropdownItem}
            key="trash"
            startContent={<ThreeTrash />}
            onClick={() => handleDelete()}
          >
            삭제하기
          </DropdownItem>
        )}
        {share && (
          <DropdownItem
            className={styles.dropdownItem}
            key="share"
            startContent={<ThreeShare />}
            // onClick={openModalShare}
            onClick={() => openModalShare(logId)}
          >
            공유하기
          </DropdownItem>
        )}
        {save && (
          <DropdownItem
            className={styles.dropdownItem}
            key="save"
            startContent={<ThreeSave width="13px" height="13px" />}
            onClick={openModalSave}
          >
            저장하기
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
