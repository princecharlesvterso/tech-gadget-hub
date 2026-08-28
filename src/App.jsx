import { useState } from "react";
import GadgetForm from "./components/GadgetForm";
import GadgetTable from "./components/GadgetTable";
import styles from "./App.module.css";

function App() {
  const [gadgets, setGadgets] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const addGadget = (newGadget) => {
    setGadgets((previousGadgets) => [...previousGadgets,newGadget,]);

    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className={styles.page}>
        <GadgetForm onAdd={addGadget} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.registryContainer}>
        <div className={styles.registryHeader}>
          
          <div>
            <p className={styles.label}>TECH GADGET INVENTORY HUB</p>

            <h1>Gadget Registry</h1>

            <p>View and select registered gadgets.</p>
          </div>

          <button className={styles.addButton}onClick={() => setShowForm(true)}>
            + Register Gadget
          </button>
        </div>

        <GadgetTable gadgets={gadgets} selectedId={selectedId} onSelect={setSelectedId}/>
      </div>
    </div>
  );
}

export default App;