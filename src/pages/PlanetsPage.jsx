import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

import PlanetImage from "../context/PlanetImage";
import LoadingBox from "../components/LoadingBox";

import styles from "./PlanetsPage.module.css";
import NavigateBackButton from "../components/NavigateBackButton";

function getSpacecraftImg(spacecraft) {
  const pic = spacecraft?.pictureUrl;
  if (Array.isArray(pic)) return pic[0] || null;
  if (typeof pic === "string") return pic || null;
  return null;
}

function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);

  // ✅ NEW: select planet first
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    const planetsRes = await SpaceTravelApi.getPlanets();
    const scRes = await SpaceTravelApi.getSpacecrafts();

    if (!planetsRes.isError) setPlanets(planetsRes.data);
    else console.error(planetsRes.data);

    if (!scRes.isError) setSpacecrafts(scRes.data);
    else console.error(scRes.data);
  };

  useEffect(() => {
    let alive = true;

    async function init() {
      setLoading(true);
      try {
        await loadAll();
      } finally {
        if (alive) setLoading(false);
      }
    }

    init();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ click planet first (toggle select)
  const handlePlanetSelect = (planetId) => {
    setSelectedPlanetId((prev) => (prev === planetId ? null : planetId));
  };

  // ✅ then click spacecraft to move it to selected planet
  const handleSpacecraftClick = async (spacecraftId) => {
    if (selectedPlanetId == null) return; // works for 0

    setLoading(true);
    try {
      const res = await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId: selectedPlanetId,
      });

      if (res.isError) {
        console.error("Move failed:", res.data);
        return;
      }

      // clear selection + refresh
      setSelectedPlanetId(null);
      await loadAll();
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingBox />;

  return (
    <div className={styles.planetsPage}>
      <div>
        <NavigateBackButton />
      </div>
      <div className={styles.planetsList}>
        {planets.map((planet) => {
          const onThisPlanet = spacecrafts.filter(
            (s) => s.currentLocation === planet.id
          );

          const planetSelected = selectedPlanetId === planet.id;

          return (
            <div key={planet.id} className={styles.planetRow}>
              {/* LEFT: planet dotted tile */}
              <button
                type="button"
                className={`${styles.planetTile} ${
                  planetSelected ? styles.planetTileSelected : ""
                }`}
                onClick={() => handlePlanetSelect(planet.id)}
              >
                <div className={styles.planetImgWrap}>
                  <PlanetImage planet={planet} />
                </div>

                <div className={styles.planetMeta}>
                  <div className={styles.planetName}>{planet.name}</div>
                  <div className={styles.planetPop}>
                    {planet.currentPopulation}
                  </div>
                </div>
              </button>

              {/* RIGHT: spacecraft minis */}
              <div className={styles.spacecraftsOnPlanet}>
                {onThisPlanet.map((s) => {
                  const img = getSpacecraftImg(s);

                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={styles.spacecraftBtn}
                      onClick={() => handleSpacecraftClick(s.id)}
                      disabled={selectedPlanetId == null}
                      title={
                        selectedPlanetId
                          ? "Click to send spacecraft here"
                          : "Select a planet first"
                      }
                    >
                      <div className={styles.spacecraftStack}>
                        <div className={styles.spacecraftMiniBox}>
                          {img ? (
                            <img
                              className={styles.spacecraftMiniImg}
                              src={img}
                              alt={s.name}
                            />
                          ) : (
                            <div className={styles.spacecraftMiniEmoji}>🚀</div>
                          )}
                        </div>

                        <div className={styles.spacecraftMeta}>
                          <div className={styles.spacecraftName}>{s.name}</div>
                          <div className={styles.spacecraftCap}>
                            {s.capacity}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanetsPage;
