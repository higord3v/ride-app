import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { RideHistory } from "./pages/RideHistory";
import { RideRequest } from "./pages/RideRequest";
import { Layout } from "./layout";
import { RideOptions } from "./pages/RideOptions";
import { NoMatch } from "./pages/NoMatch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index path="/" element={<RideRequest />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/options/:customerId" element={<RideOptions />} />
          <Route path="*" element={<NoMatch />}/>
          <Route path="/not-found" element={<NoMatch />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
