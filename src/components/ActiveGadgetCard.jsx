import styles from "../App.module.css";

function ActiveGadgetCard({ gadget }) {
  if (!gadget) {
    return null;
  }

  return (
    <div className={styles.detailCard}>
      <div className={styles.detailHeader}>
        <div>
          <p className={styles.detailLabel}>ACTIVE GADGET</p>

          <h2>{gadget.gadgetName}</h2>
        </div>

        <span className={styles.roleBadge}>
          {gadget.role}
        </span>
      </div>

      <div className={styles.detailGrid}>
        <div>
          <span>Category</span>
          <strong>{gadget.category}</strong>
        </div>

        <div>
          <span>Manufacturer</span>
          <strong>{gadget.manufacturer}</strong>
        </div>

        <div>
          <span>Health Rating</span>
          <strong>{gadget.healthRating} / 100</strong>
        </div>

        <div>
          <span>Tech Brand</span>
          <strong>{gadget.techBrandName}</strong>
        </div>
      </div>
    </div>
  );
}

export default ActiveGadgetCard;