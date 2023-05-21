import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";

import "./App.scss";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Suspense>
  );
}

export default App;
