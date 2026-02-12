import styles from "./PlanetImage.module.css";

function PlanetImage({ planet, onClick, isTargeting }) {
  return (
    <img
      src={planet.pictureUrl}
      alt={planet.name}
      className={`${styles.planetImage} ${isTargeting ? styles.targeting : ""}`}
      onClick={onClick}
    />
  );
}

export default PlanetImage;
