import { useNavigate } from "react-router-dom";
import styles from "./BuildButton.module.css";

export default function BuildButton() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.buildButton}
      onClick={() => navigate("/construction")}
    >
      🛠 Build a Spacecraft
    </button>
  );
}
