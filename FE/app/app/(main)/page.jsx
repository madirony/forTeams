import styles from "styles/main.module.css";

import MenuBar from "component/menuBar";
import Input from "component/input";
import ChatBotInput from "component/chatBotInput";
export default function Main() {
  return (
    <div className={styles.div}>
      {/* <p>Welcome to Main Page!!</p> */}
      <MenuBar />
      <Input />
      <ChatBotInput />
    </div>
  );
}
