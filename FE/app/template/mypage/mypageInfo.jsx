import styles from "styles/template/mypageInfo.module.css";
import Input from "component/input";
import GradientButton from "component/gradientButton";

export default function MypageInfo() {
  // 사용자 정보를 로컬에서 받아와 placeholder로 사용
  const name = "이수민";
  const dept = "철강영업팀";

  return (
    <div className={styles.wrapper}>
      <Input title={"이름"} placeholder={name} />
      <Input title={"부서"} placeholder={dept} />

      <div className={styles.button}>
        <GradientButton mode={"ONE_BUTTON"} purpleButtonText={"완료"} />
      </div>
    </div>
  );
}
