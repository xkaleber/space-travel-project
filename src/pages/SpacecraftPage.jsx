import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpaceTravelApi from "../services/SpaceTravelApi";
import LoadingBox from "../components/LoadingBox";

import styles from "./SpacecraftPage.module.css";
import NavigateBackButton from "../components/NavigateBackButton";

function getDisplayImage(spacecraft) {
  const pic = spacecraft?.pictureUrl;
  if (Array.isArray(pic)) return pic[0] || null;
  if (typeof pic === "string") return pic || null;
  return null;
}

export default function SpacecraftPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [spacecraft, setSpacecraft] = useState(null);

  useEffect(() => {
    async function fetchOne() {
      setLoading(true);
      const res = await SpaceTravelApi.getSpacecraftById({ id });
      if (!res.isError) setSpacecraft(res.data);
      else console.error(res.data);
      setLoading(false);
    }
    fetchOne();
  }, [id]);

  if (loading) return <LoadingBox />;
  if (!spacecraft) return <div className={styles.page}>Not found.</div>;

  const img = getDisplayImage(spacecraft);

  return (
    <div className={styles.page}>
      <div>
        <NavigateBackButton />
      </div>
      <div className={styles.content}>
        <div className={styles.imageRow}>
          <div className={styles.dottedBox}>
            {img ? (
              <img className={styles.image} src={img} alt={spacecraft.name} />
            ) : (
              <div className={styles.emoji}>🚀</div>
            )}
          </div>
        </div>

        <div className={styles.detailsRow}>
          <div className={styles.left}>
            <div className={styles.label}>Name: {spacecraft.name}</div>
            <div className={styles.label}>Capacity: {spacecraft.capacity}</div>
          </div>

          <div className={styles.right}>
            <div className={styles.label}>Description:</div>
            <div className={styles.description}>{spacecraft.description}</div>
          </div>
        </div>
      </div>

        <footer className={styles.footer}>
          <div>The solar system: the new home.</div>
          <div className={styles.footerIcons}>🌍🚀👨‍🚀🪐</div>
        </footer>
    
    </div>
  );
}
