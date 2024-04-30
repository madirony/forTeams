import styles from "styles/page/main.module.css";
import MenuBar from "component/menuBar.jsx";

export default function Main() {
  return (
    <div className={styles.root}>
      <MenuBar />
      <div className={styles.content}>
        <p>Welcome to Main Page!!</p>
      </div>
    </div>
  );
}
