import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

import PlanetImage from "../context/PlanetImage";
import LoadingBox from "../components/LoadingBox";

import styles from "./PlanetsPage.module.css";
import NavigateBackButton from "../components/NavigateBackButton";

// Helper function to get the spacecraft image URL, handling both string and array formats.
function getSpacecraftImg(spacecraft) {
  const pic = spacecraft?.pictureUrl;
  if (Array.isArray(pic)) return pic[0] || null;
  if (typeof pic === "string") return pic || null;
  return null;
}

// The PlanetsPage component displays a list of planets and the spacecraft currently on each planet.
function PlanetsPage() {

  // State to hold the list of planets and spacecrafts fetched from the API.
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);

  // ✅ NEW: select planet first
  // State to track which planet is currently selected by the user. This allows the user to first select a planet and then click on a spacecraft to send it there.
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  // State to track whether data is currently being loaded from the API. This is used to show a loading indicator while the data is being fetched.
  const [loading, setLoading] = useState(true);

  // Function to load both planets and spacecrafts data from the API. This is called on component mount and after moving a spacecraft to refresh the data.
  const loadAll = async () => {

    // Fetch planets and spacecrafts data from the API. The API returns an object with isError and data properties. If isError is false, we update the state with the fetched data; otherwise, we log the error.
    const planetsRes = await SpaceTravelApi.getPlanets();
    const scRes = await SpaceTravelApi.getSpacecrafts();

    if (!planetsRes.isError) setPlanets(planetsRes.data);
    else console.error(planetsRes.data);

    if (!scRes.isError) setSpacecrafts(scRes.data);
    else console.error(scRes.data);
  };

  // useEffect to load data on component mount. We set loading to true before starting the fetch and set it back to false after the fetch is complete. We also use a flag (alive) to prevent setting state if the component has unmounted before the fetch completes.
  useEffect(() => {
    let alive = true;

    // Define an async function to load data and manage the loading state. This function is called immediately within the useEffect to fetch data when the component mounts.
    async function init() {
      setLoading(true);
      try {
        await loadAll();
      } finally {
        if (alive) setLoading(false);
      }
    }

    // Call the init function to start loading data when the component mounts. The cleanup function sets alive to false to prevent state updates if the component unmounts before the fetch completes.
    init();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ click planet first (toggle select)
  // Function to handle when a planet is clicked. If the planet is already selected, it will be deselected; otherwise, it will be selected.
  const handlePlanetSelect = (planetId) => {
    setSelectedPlanetId((prev) => (prev === planetId ? null : planetId));
  };

  // ✅ then click spacecraft to move it to selected planet
  // Function to handle when a spacecraft is clicked. If a planet is selected, the spacecraft will be sent to that planet.
  const handleSpacecraftClick = async (spacecraftId) => {
    if (selectedPlanetId == null) return; // works for 0

    // Set loading to true while the move operation is in progress. We call the API to send the spacecraft to the selected planet. If the API call is successful, we clear the selected planet and refresh the data by calling loadAll. Finally, we set loading back to false.
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

        {/* Render each planet and its associated spacecrafts */}
        {planets.map((planet) => {
          // Filter the spacecrafts to find those that are currently located on this planet. This allows us to display the spacecrafts that are on each planet in the UI.
          const onThisPlanet = spacecrafts.filter(
            // Check if the spacecraft's current location matches the planet's ID. This is used to determine which spacecrafts are currently on this planet so we can display them in the UI.
            (s) => s.currentLocation === planet.id
          );

          // Check if the current planet is selected
          const planetSelected = selectedPlanetId === planet.id;

          return (
            <div key={planet.id} className={styles.planetRow}>

              {/* LEFT: planet dotted tile */}
              { /* Render the planet tile with its image and metadata */ }

              <button
                // When the planet tile is clicked, it will call handlePlanetSelect to toggle the selection of this planet. The tile's styling will change if it is selected to provide visual feedback to the user.
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
                  {/* Render the planet's name and current population */}
                  <div className={styles.planetName}>{planet.name}</div>
                  <div className={styles.planetPop}>
                    {planet.currentPopulation}
                  </div>
                </div>
              </button>

              {/* RIGHT: spacecraft minis */}
              { /* Render the spacecrafts that are currently on this planet */ }
              <div className={styles.spacecraftsOnPlanet}>
                {onThisPlanet.map((s) => {
                  // Get the image URL for the spacecraft, handling both string and array formats. This allows us to display the correct image for each spacecraft in the UI.
                  const img = getSpacecraftImg(s);

                  return (
                    <button
                      // When a spacecraft button is clicked, it will call handleSpacecraftClick to send that spacecraft to the currently selected planet. The button is disabled if no planet is currently selected, and the title attribute provides feedback to the user about what they need to do.
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

                      {/* Render the spacecraft's image and metadata in a mini tile format */ }
                      {/* This is where you can stack multiple spacecrafts visually if needed */ }
                      <div className={styles.spacecraftStack}>
                        <div className={styles.spacecraftMiniBox}>

                          {/* If the spacecraft has an image, render it; otherwise, render a default emoji. This provides a visual representation of the spacecraft in the UI, even if no image is available. */ }
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

        <footer className={styles.footer}>
          <div>The solar system: the new home.</div>
          <div className={styles.footerIcons}>🌍🚀👨‍🚀🪐</div>
        </footer>
        
    </div>
  );
}

export default PlanetsPage;
