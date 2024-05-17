"use client";

import { useState, useEffect } from "react";
import styles from "styles/component/threedotDropdown.module.css";
import Image from "next/image";
import ThreeReset from "icon/threeReset.svg";
import ThreeTrash from "icon/threeTrash.svg";
import ThreeShare from "icon/threeShare.svg";
import ThreeSave from "icon/threeSave.svg";
import LocalStorage from "util/localStorage";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { deleteChatLog } from "apis/allLog";
import { getCurrentChatUUID, saveChatbot } from "apis/chatbot";

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
  // ★Local에서 사용자 정보를 조회 =================================
  const userId = LocalStorage.getItem("userId");
  const userNickname = LocalStorage.getItem("userNickname");
  const userDept = LocalStorage.getItem("userDept");

  // 현재 챗봇 uuid 가져오기
  const [chatUUID, setChatUUID] = useState("");
  useEffect(() => {
    getCurrentChatUUID(userId).then((response) => {
      // console.log("하나둘셋얍", response.chatbotChatUUID);
      setChatUUID(response.chatbotChatUUID);
    });
  }, []);
  // console.log("11111", chatUUID);
  // console.log("2222", userId);

  // 화면 초기화
  const handleRefresh = async () => {
    try {
      const response = await saveChatbot(userId, chatUUID);
      console.log("초기화 중 저장 성공:", response);
      // 화면 새로고침
      window.location.reload();
    } catch (error) {
      console.error("초기화 중 저장 실패:", error);
    }
  };

  // 삭제하기
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
            onClick={() => handleRefresh()}
          >
            채팅기록 저장하기
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
            내 문서함에 저장하기
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
