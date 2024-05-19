import styles from "styles/component/toYoutubeLink.module.css";
import Youtube from "icon/youtube.svg";

export default function ToYoutubeLink() {
  const onClick = () => {
    // console.log("To Youtube 클릭!");
  };

  return (
    <div className={styles.wrapper} onClick={onClick}>
      <Youtube width={23} height={20} />
      <p className={styles.text}>관련 영상 시청하기</p>
    </div>
  );
}
