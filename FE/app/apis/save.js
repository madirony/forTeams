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
