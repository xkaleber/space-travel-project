import styles from "./SpacecraftImage.module.css";

function SpacecraftImage({ spacecraft, isSelected, onClick }) {
  const imgSrc = Array.isArray(spacecraft.pictureUrl)
    ? spacecraft.pictureUrl[0]
    : spacecraft.pictureUrl;

  return (
    <div
      className={`${styles.tile} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      title="Click to select this spacecraft"
    >
      {imgSrc ? (
        <img
          className={styles.spacecraftImage}
          src={imgSrc}
          alt={spacecraft.name}
        />
      ) : (
        <div className={styles.emoji}>🚀</div>
      )}
      <div className={styles.meta}>
        <div className={styles.name}>{spacecraft.name}</div>
        <div className={styles.capacity}>{spacecraft.capacity}</div>
      </div>
    </div>
  );
}

export default SpacecraftImage;
