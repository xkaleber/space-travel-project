import AppRoutes from "./routes/Routes";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <AppRoutes />
    </div>
  );
}
