import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { RideHistory } from "./pages/RideHistory";
import { RideRequest } from "./pages/RideRequest";
import { Layout } from "./layout";
import { RideOptions } from "./pages/RideOptions";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        <Route index path="/" element={<RideRequest />} />
        <Route path="/history/:customerId" element={<RideHistory />} />
        <Route path="/options/:customerId" element={<RideOptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
