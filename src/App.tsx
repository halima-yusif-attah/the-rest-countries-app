import React from "react";
import Buttons from "./components/Buttons";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { ThemeProvider } from "./components/ThemeContext";
import { FilterProvider } from "./components/FilterContext";
import { AllDataProvider } from "./components/LoadData";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <AllDataProvider>
          <Header />
          <FilterProvider>
            <Buttons />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/details/:countryName" element={<DetailsPage />} />
            </Routes>
          </FilterProvider>
        </AllDataProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
