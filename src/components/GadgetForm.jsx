import { useState } from "react";
import styles from "../App.module.css";

function GadgetForm({ onAdd }) {
  const [formData, setFormData] = useState({
    gadgetName: "",
    category: "",
    manufacturer: "",
    healthRating: "",
    techBrandName: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";

    if (name === "gadgetName") {
      if (!value.trim()) {
        error = "Gadget name is required.";
      } else if (value.trim().length < 3) {
        error = "Gadget name must be at least 3 characters.";
      }
    }

    if (name === "category" && !value) {
      error = "Please select a category.";
    }

    if (name === "manufacturer" && !value.trim()) {
      error = "Manufacturer is required.";
    }

    if (name === "healthRating") {
      if (value === "") {
        error = "Health rating is required.";
      } else if (Number(value) < 1 || Number(value) > 100) {
        error = "Health rating must be between 1 and 100.";
      }
    }

    if (name === "techBrandName" && !value.trim()) {
      error = "Tech brand name is required.";
    }

    if (name === "role" && !value) {
      error = "Please select a user role.";
    }

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({...formData,[name]: value,});

    setErrors({...errors,[name]: validateField(name, value),});

    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {newErrors[field] = error;}
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const newGadget = {
    id: Date.now(),
    gadgetName: formData.gadgetName.trim(),
    category: formData.category,
    manufacturer: formData.manufacturer.trim(),
    healthRating: Number(formData.healthRating),
    techBrandName: formData.techBrandName.trim(),
    role: formData.role,
  };

  onAdd(newGadget);

  setFormData({
    gadgetName: "",
    category: "",
    manufacturer: "",
    healthRating: "",
    techBrandName: "",
    role: "",
  });

  setErrors({});
};

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <p className={styles.label}>
          TECH GADGET INVENTORY HUB
        </p>

        <h1>Gadget Registration</h1>

        <p>Enter the gadget information below.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label>Gadget Name</label>

          <input type="text" name="gadgetName" placeholder="e.g. Xiaomi 17 Pro" value={formData.gadgetName} onChange={handleChange} />

          {errors.gadgetName && (
            <span className={styles.error}>
              {errors.gadgetName}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>

          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Wearable">Wearable</option>
            <option value="Audio">Audio</option>
          </select>

          {errors.category && (
            <span className={styles.error}>
              {errors.category}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Manufacturer</label>

          <input type="text" name="manufacturer" placeholder="e.g. Xiaomi Corporation" value={formData.manufacturer} onChange={handleChange}/>
        {errors.manufacturer && (
            <span className={styles.error}>
              {errors.manufacturer}
            </span>
          )}
        </div>
        

        <div className={styles.formGroup}>
          <label>Health Rating</label>
          <input type="number" name="healthRating" min="1" max="100" placeholder="1 - 100" value={formData.healthRating} onChange={handleChange}/>
            {errors.healthRating && (
            <span className={styles.error}>
              {errors.healthRating}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Tech Brand Name</label>

          <input type="text" name="techBrandName" placeholder="e.g. Xiaomi" value={formData.techBrandName} onChange={handleChange}/>
          {errors.techBrandName && (
            <span className={styles.error}>
              {errors.techBrandName}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>User Role</label>
          
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
            <input type="radio" name="role" value="Engineer" checked={formData.role === "Engineer"} onChange={handleChange}/> Engineer
            </label>

            <label className={styles.radioOption}>
            <input type="radio" name="role"value="Tester" checked={formData.role === "Tester"}onChange={handleChange}/> Tester
            </label>
          </div>

          {errors.role && (
            <span className={styles.error}>
              {errors.role}
            </span>
          )}
        </div>

        {successMessage && (
          <div className={styles.success}>
            {successMessage}
          </div>
        )}
        <button type="submit" className={styles.submitButton}>Register Gadget</button>
        
        </form>
    </div>
  );
}

export default GadgetForm;