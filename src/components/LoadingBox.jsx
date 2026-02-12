import styles from "./LoadingBox.module.css";

export default function LoadingBox() {
  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.loading}>Loading</div>
        <div className={styles.dots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}
