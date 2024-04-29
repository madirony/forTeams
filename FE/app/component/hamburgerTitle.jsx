import styles from "styles/component/hamburgerTitle.module.css";
import Image from "next/image";

// ★ 나중에 부모 div의 크기에 맞춰 titleWrapper의 width 조정하기

export default function HamburgerTitle({ icon, title }) {
  return (
    <div className={styles.titleWrapper}>
      <Image
        src={`icon/${icon}`}
        alt="hamburger title icon"
        width={37}
        height={37}
      />
      <p className={styles.text}>{title}</p>
    </div>
  );
}
