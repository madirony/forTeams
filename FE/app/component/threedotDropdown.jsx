"use client";

import { useState, useEffect } from "react";
import styles from "styles/component/threedotDropdown.module.css";
import Image from "next/image";
import ThreeReset from "icon/threeReset.svg";
import ThreeTrash from "icon/threeTrash.svg";
import ThreeShare from "icon/threeShare.svg";
import ThreeSave from "icon/threeSave.svg";
import LocalStorage from "util/localStorage";
import { useRouter } from "next/navigation";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { deleteChatLog } from "apis/allLog";
import { getCurrentChatUUID, saveChatbot } from "apis/chatbot";
import { deleteFolderData } from "apis/save";

export default function ThreedotDropdown({
  reset,
  trashAtAll,
  trashAtMy,
  share,
  save,
  openModalShare,
  openModalSave,
  logId,
  setLogId,
}) {
  const router = useRouter();

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

  // 전체 페이지에서 삭제하기
  const handleDeleteAtAll = async () => {
    try {
      const response = await deleteChatLog(logId);
      console.log("전체 페이지에서 삭제 성공:", response);
      // 화면 새로고침
      window.location.reload();
    } catch (error) {
      console.error("전체 페이지에서 삭제 실패:", error);
    }
  };

  // 내 페이지에서 삭제하기
  const handleDeleteAtMy = async () => {
    try {
      const response = await deleteFolderData(logId);
      console.log("내 페이지에서 삭제 성공:", response);
      window.location.reload();
    } catch (error) {
      console.error("내 페이지에서 삭제 실패:", error);
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
        {trashAtAll && (
          <DropdownItem
            className={styles.dropdownItem}
            key="trashAtAll"
            startContent={<ThreeTrash />}
            onClick={() => handleDeleteAtAll()}
          >
            삭제하기
          </DropdownItem>
        )}
        {trashAtMy && (
          <DropdownItem
            className={styles.dropdownItem}
            key="trashAtMy"
            startContent={<ThreeTrash />}
            onClick={() => handleDeleteAtMy()}
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
