import styles from "styles/component/mypageHamburgerMobile.module.css";

export default function MypageHamburgerMobile({
  selectedPage,
  setSelectedPage,
}) {
  // selected 여부를 결정하는 함수
  const getClassName = (currentPage) => {
    return `${styles.list} ${
      selectedPage === currentPage ? styles.selectedTag : styles.tag
    }`;
  };

  return (
    <div className={styles.wrapper}>
      <p
        className={getClassName("info")}
        onClick={() => {
          setSelectedPage("info");
        }}
      >
        사용자 정보
      </p>
      <p
        className={getClassName("allLogs")}
        onClick={() => {
          setSelectedPage("allLogs");
        }}
      >
        전체 기록 확인
      </p>
      <p
        className={getClassName("myLogs")}
        onClick={() => {
          setSelectedPage("myLogs");
        }}
      >
        내가 저장한 기록 확인
      </p>
    </div>
  );
}
