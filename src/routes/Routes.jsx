import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar.jsx";
import HomePage from "../pages/HomePage.jsx";
import PlanetsPage from "../pages/PlanetsPage.jsx";
import SpacecraftsPage from "../pages/SpacecraftsPage.jsx";
import SpacecraftPage from "../pages/SpacecraftPage.jsx";
import ConstructionForm from "../context/ConstructionForm.jsx";
import NavigateBackButton from "../components/NavigateBackButton.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/spacecrafts/:id" element={<SpacecraftPage />} />
        <Route path="/construction" element={<ConstructionForm />} />
      </Routes>
    </BrowserRouter>
  );
}
