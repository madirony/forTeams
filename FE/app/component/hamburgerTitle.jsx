import styles from "styles/component/hamburgerTitle.module.css";
import Image from "next/image";

export default function HamburgerTitle({ icon, title }) {
  return (
    <div className={styles.titleWrapper}>
      <Image
        src={`icon/${icon}`}
        alt="hamburger title icon"
        width={30}
        height={30}
      />
      <p className={styles.text}>{title}</p>
    </div>
  );
}
