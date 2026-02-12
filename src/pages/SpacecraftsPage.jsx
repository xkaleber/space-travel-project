import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SpaceTravelApi from "../services/SpaceTravelApi";
import BuildButton from "../components/BuildButton";
import LoadingBox from "../components/LoadingBox";

import styles from "./SpacecraftsPage.module.css";
import NavigateBackButton from "../components/NavigateBackButton";

function getDisplayImage(spacecraft) {
  const pic = spacecraft?.pictureUrl;
  if (Array.isArray(pic)) return pic[0] || null;
  if (typeof pic === "string") return pic || null;
  return null;
}

export default function SpacecraftsPage() {
  const [loading, setLoading] = useState(true);
  const [spacecrafts, setSpacecrafts] = useState([]);

  async function load() {
    setLoading(true);
    const res = await SpaceTravelApi.getSpacecrafts();
    if (!res.isError) setSpacecrafts(res.data);
    else console.error(res.data);
    setLoading(false);
  }

  async function destroy(id) {
    await SpaceTravelApi.destroySpacecraftById({ id });
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <NavigateBackButton />
      </div>

      {loading ? (
        <LoadingBox />
      ) : (
        <div className={styles.list}>
          {spacecrafts.map((s) => {
            const img = getDisplayImage(s);
            return (
              <div key={s.id} className={styles.card}>
                <Link
                  to={`/spacecrafts/${s.id}`}
                  className={styles.imageWrap}
                  aria-label={s.name}
                >
                  <div className={styles.dottedBox}>
                    {img ? (
                      <img className={styles.image} src={img} alt={s.name} />
                    ) : (
                      <div className={styles.emoji}>🚀</div>
                    )}
                  </div>
                </Link>

                <div className={styles.info}>
                  <div className={styles.line}>Name: {s.name}</div>
                  <div className={styles.line}>Capacity: {s.capacity}</div>
                </div>

                <button
                  className={styles.destroy}
                  onClick={() => destroy(s.id)}
                >
                  💥 Destroy
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <BuildButton />
      </div>
        <footer className={styles.footer}>
          <div>The solar system: the new home.</div>
          <div className={styles.footerIcons}>🌍🚀👨‍🚀🪐</div>
        </footer>
    </div>
  );
}
