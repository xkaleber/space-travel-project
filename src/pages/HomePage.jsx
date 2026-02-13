import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.subtitle}>
        Space Travel: Expanding Horizons Beyond Earth
      </h2>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>📘 Journey into the Future</h3>
          <div className={styles.dottedBox}>
            <p>
              In a world where the impossible has become reality, where the
              stars are no longer out of reach, welcome to the future of
              humanity&apos;s survival and exploration. Witness the evolution of
              technology as it transforms barren planets into thriving havens,
              all made possible by the wonders of innovation and human
              determination.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🌍 From Neglect to Innovation</h3>
          <div className={styles.dottedBox}>
            <p>
              Once the cradle of civilization, Earth now stands as a solemn
              reminder of the consequences of neglect and environmental decline.
              But fear not, for the ingenuity of mankind has soared to new
              heights. With our relentless pursuit of advancement, we have not
              only healed our scars but extended our reach across the cosmos.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            🚀 Enter Space Travel: Where Dreams Take Flight
          </h3>
          <div className={styles.dottedBox}>
            <p>
              Embark on an extraordinary journey with our groundbreaking web
              application, aptly named &quot;Space Travel.&quot; As a commander
              engineer, the fate of humanity&apos;s exodus rests in your capable
              hands. Prepare to face the ultimate challenge: evacuating
              humankind from their birthplace and guiding them towards a future
              among the stars.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🔧 Engineer, Explorer, Leader</h3>
          <div className={styles.dottedBox}>
            <p>
              Space Travel empowers you to engineer, design, and even dismantle
              spacecraft. Craft vessels that defy the boundaries of imagination,
              envisioning a future where life flourishes beyond the stars. But
              remember, your role extends beyond construction — you are a
              leader, an explorer, a commander steering humanity&apos;s destiny.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            🗺️ A Universe of Possibilities Awaits
          </h3>
          <div className={styles.dottedBox}>
            <p>
              Immerse yourself in the thrill of exploration as you chart
              interplanetary courses within our solar system. Seamlessly
              navigate your fleet of spacecraft, hurtling through the cosmic
              void from one celestial body to another. The universe becomes your
              playground, and every planet a potential new home.
            </p>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div>The solar system: the new home.</div>
        <div className={styles.footerIcons}>🌍🚀👨‍🚀🪐</div>
      </footer>
    </div>
  );
}

export default HomePage;
