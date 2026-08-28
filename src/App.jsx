import { useEffect, useState } from "react";
import GadgetForm from "./components/GadgetForm";
import GadgetTable from "./components/GadgetTable";
import ActiveGadgetCard from "./components/ActiveGadgetCard";
import styles from "./App.module.css";

function App() {
  const [gadgets, setGadgets] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const [activeGadget, setActiveGadget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const addGadget = (newGadget) => {
    setGadgets((previousGadgets) => [...previousGadgets,newGadget,]);

    setShowForm(false);
  };

  const filteredGadgets =
  categoryFilter === "All"
    ? gadgets
    : gadgets.filter(
        (gadget) =>
          gadget.category === categoryFilter
      );

  useEffect(() => {
  const selected = gadgets.find(
    (gadget) => gadget.id === selectedId
  );

  setActiveGadget(selected || null);
  }, [selectedId, gadgets]);

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
          <div className={styles.filterSection}>
      <label htmlFor="categoryFilter">Filter by Category</label>
    <select id="categoryFilter" value={categoryFilter}
      onChange={(event) => {setCategoryFilter(event.target.value);
      setSelectedId(null);
    }}>
      <option value="All">All Categories</option>
      <option value="Smartphone">Smartphone</option>
      <option value="Laptop">Laptop</option>
      <option value="Wearable">Wearable</option>
      <option value="Audio">Audio</option>
    </select>
    </div>
          
    <div>
      <p className={styles.label}>TECH GADGET INVENTORY HUB</p>
        
        <h1>Gadget Registry</h1>
        
        <p>View and select registered gadgets.</p>
    </div>

      <button className={styles.addButton}onClick={() => setShowForm(true)}>
            + Register Gadget
          </button>
        </div>

        <GadgetTable gadgets={filteredGadgets} selectedId={selectedId} onSelect={setSelectedId}/>
        
        <ActiveGadgetCard gadget={activeGadget}/>

      </div>
    </div>
  );
}

export default App;