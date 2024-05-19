import axios from "util/baseAPI";

//폴더 목록 불러오기
const getFolders = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "api/v1/folder",
    });
    // console.log("폴더 목록 불러오기 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더 목록 불러오기 중 에러 발생", error);
  }
};

//폴더 생성
const createFolder = async (folderName) => {
  try {
    const response = await axios({
      method: "post",
      url: "api/v1/folder",
      data: folderName,
      headers: { "Content-Type": "text/plain" },
    });
    // console.log("폴더생성 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더 생성 중 에러 발생", error);
  }
};

//폴더명 변경
const changeFolderName = async (folderName, folderId) => {
  try {
    const response = await axios({
      method: "put",
      url: "/api/chatbot/folder",
      data: {
        folderName: folderName,
        folderId: folderId,
      },
    });
    // console.log("폴더명 변경 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더명 변경 중 에러 발생", error);
  }
};

//폴더 삭제
const deleteFolder = async (folderId) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/chatbot/folder/${folderId}`,
    });
    // console.log("폴더 삭제 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더 삭제 중 에러 발생", error);
  }
};

//폴더에 챗봇 내역 저장
const saveMyChatbot = async (folderId, chatbotUuid, chatbotTitle) => {
  try {
    const response = await axios({
      method: "post",
      url: "api/v1/folder/categorized-chatbot",
      // data: folderId,
      // chatbotUuid,
      // chatbotTitle,
      // headers: { "Content-Type": "text/plain" },
      data: {
        folderId: folderId,
        chatbotUuid: chatbotUuid,
        chatbotTitle: chatbotTitle,
      },
    });
    // console.log("폴더에 내 챗봇 내역 생성 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더에 내 챗봇 내역 생성 중 에러 발생", error);
  }
};

//폴더 기준으로 챗봇목록 조회
const getMyChatbotList = async (folderId) => {
  try {
    const response = await axios({
      method: "get",
      url: "api/v1/folder/categorized-chatbot",
      params: {
        folderId: folderId,
      },
    });
    // console.log("폴더 기준으로 챗봇목록 조회 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더 기준으로 챗봇목록 조회 중 에러 발생", error);
  }
};

// 폴더 저장 데이터 지우기
const deleteFolderData = async (chatbotChatUUID) => {
  try {
    const response = await axios({
      method: "delete",
      url: `api/v1/folder/categorized-chatbot/${chatbotChatUUID}`,
    });
    // console.log("폴더 저장 데이터 지우기 api요청", response.data);
    return response.data;
  } catch (error) {
    // console.log("폴더 저장 데이터 지우기 중 에러 발생", error);
  }
};

export {
  getFolders,
  createFolder,
  changeFolderName,
  deleteFolder,
  saveMyChatbot,
  getMyChatbotList,
  deleteFolderData,
};
