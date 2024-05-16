import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "styles/component/chatBotBubble.module.css";
import SmallIndex from "./smallIndex";

function cleanMarkdown(markdownText) {
  if (
    markdownText.indexOf("<img>") != -1 &&
    markdownText.indexOf("</img>") != -1
  ) {
    const url = markdownText.split("<img>")[1].split("</img>")[0];
    markdownText = markdownText.split("<img>")[0];
    markdownText += "\n\nㅤ아래 영상을 따라해보세요!";
    return {
      text: markdownText
        // 한글 문자 뒤에 `.` 또는 `:`가 붙으면 개행 추가
        .replaceAll("<br />", "\n\nㅤ"),
      imageUrl: url,
    };
  }

  return {
    text: markdownText
      // 한글 문자 뒤에 `.` 또는 `:`가 붙으면 개행 추가
      .replaceAll("<br />", "\n\nㅤ"),
    imageUrl: null,
  };
}

export default function ChatBotBubble({
  mode,
  indexes,
  message,
  sendIndexMessage,
  pushToMessages,
}) {
  if (mode === "BOT") {
    const { text, imageUrl } = cleanMarkdown(message);
    return (
      <div className={styles.wrapper}>
        <div className={styles.nicknameBox}>
          <Image src="icon/smile.svg" alt="smile icon" width={24} height={24} />
          <p>Point Chat Bot</p>
        </div>
        <div className={styles.bubbleBox}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ReactMarkdown
              className={styles.chatbotBubble}
              remarkPlugins={[remarkGfm]}
            >
              {text}
            </ReactMarkdown>
            {imageUrl && (
              <div className={styles.imageWrapper}>
                <Image
                  style={{ marginTop: "10px;" }}
                  src={imageUrl}
                  alt="Image"
                  width={700}
                  height={300}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else if (mode === "USER") {
    return (
      <div className={styles.bubbleBox}>
        <div className={styles.userBubble}>{message}</div>
      </div>
    );
  } else if (mode === "INDEX") {
    return (
      <SmallIndex
        indexes={indexes}
        sendIndexMessage={sendIndexMessage}
        pushToMessages={pushToMessages}
      />
    );
  }
  return null;
}
