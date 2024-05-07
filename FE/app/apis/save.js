import axios from "util/baseAPI";

//
const 예시예시 = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "/associations",
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//폴더 생성
const createFolder = async (folderName, userId) => {
  try {
    const response = await axios({
      method: "post",
      url: "api/chatbot/folder",
      data: {
        folderName: folderName,
        userId: userId,
      },
    });
    console.log("폴더생성 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("폴더 생성 중 에러 발생", error);
  }
};

//폴더 목록 불러오기
const getFolders = async (userId) => {
  try {
    const response = await axios({
      method: "get",
      url: "api/chatbot/folder",
      data: {
        userId: userId,
      },
    });
    console.log("폴더 목록 불러오기 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("폴더 목록 불러오기 중 에러 발생", error);
  }
};

//폴더명 변경
const changeFolderName = async (folderName, folderId) => {
  try {
    const response = await axios({
      method: "put",
      url: "api/chatbot/folder",
      data: {
        folderName: folderName,
        folderId: folderId,
      },
    });
    console.log("폴더명 변경 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("폴더명 변경 중 에러 발생", error);
  }
};

//폴더 삭제
const deleteFolder = async (folderId) => {
  try {
    const response = await axios({
      method: "delete",
      url: `api/chatbot/folder/${folderId}`,
    });
    console.log("폴더 삭제 api요청", response.data);
    return response.data;
  } catch (error) {
    console.log("폴더 삭제 중 에러 발생", error);
  }
};

export { createFolder, getFolders, changeFolderName, deleteFolder };
