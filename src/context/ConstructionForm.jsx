// src/pages/ConstructionForm.jsx (or wherever yours lives)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import styles from "./ConstructionForm.module.css";

const initialFormState = {
  name: "",
  capacity: "",
  description: "",
  pictureUrl: "",
  currentLocation: 2,
};

function ConstructionForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // clear field error as user types
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!formState.name.trim()) nextErrors.name = "Name is required!";
    if (formState.capacity === "" || Number.isNaN(Number(formState.capacity)))
      nextErrors.capacity = "Capacity is required!";
    if (!formState.description.trim())
      nextErrors.description = "Description is required!";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const response = await SpaceTravelApi.buildSpacecraft({
      name: formState.name.trim(),
      capacity: parseInt(formState.capacity, 10),
      description: formState.description.trim(),
      pictureUrl: formState.pictureUrl ? [formState.pictureUrl] : [""],
    });

    if (!response.isError) navigate("/spacecrafts");
    else console.error("Error building spacecraft:", response.data);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          Back 👈
        </button>

        {/* big rectangle like the finished screenshot */}
        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={handleChange}
          />

          <input
            className={styles.input}
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formState.capacity}
            onChange={handleChange}
          />

          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleChange}
          />

          <input
            className={styles.input}
            type="text"
            name="pictureUrl"
            placeholder="Picture URL"
            value={formState.pictureUrl}
            onChange={handleChange}
          />
        </form>

        {/* red warnings placed UNDER the big rectangle (like your finished) */}
        <div className={styles.errors}>
          {errors.capacity && (
            <div className={styles.errorText}>{errors.capacity}</div>
          )}
          {errors.description && (
            <div className={styles.errorText}>{errors.description}</div>
          )}
          {/* (optional) name warning if you want it visible too:
              {errors.name && <div className={styles.errorText}>{errors.name}</div>}
          */}
        </div>

        {/* Build button OUTSIDE the big rectangle, bottom-right */}
        <div className={styles.actions}>
          <button
            className={styles.buildBtn}
            type="submit"
            onClick={handleSubmit}
          >
            Build 🏗️
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <div>The solar system: the new home.</div>
        <div className={styles.footerIcons}>🌍🚀👨‍🚀🪐</div>
      </footer>
    </div>
  );
}

export default ConstructionForm;
