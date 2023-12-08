import React, { useContext } from "react";
import { AllDataContext } from "./LoadData";
import { FilterContext } from "./FilterContext";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";


const HomePage = () => {
  const data = useContext(AllDataContext) || [];
  const context = useContext(FilterContext);
  const themecontext = useContext(ThemeContext);

  if (!themecontext) {
    return null;
  }
  const { theme } = themecontext;

  if (!context) {
    return null;
  }
  const { filteredData, search } = context;

  const AllData = data.filter((item) => {
    const itemName = item.name.common.toLowerCase();
    const itemRegion = item.region.toLowerCase();
    const isSearchMatch = search
      ? itemName.includes(search.toLowerCase())
      : true;

    const isFilteredDataMatch = filteredData
      ? itemRegion === filteredData.toLowerCase()
      : true;

    return isSearchMatch && isFilteredDataMatch;
  });
  const isAnyCountryFound = AllData.length > 0;


  return (
    <div className={`container ${theme === "dark" ? "dark-mode" : ""}`}>
      {isAnyCountryFound ? AllData.map((country, index) => (
        <div key={country.cca3} className="item">
          <div className="country-logo">
            <img
              src={country.flags.png}
              alt={`Country Flag ${country.name.common}`}
              width="100"
              height="100"
            />
          </div>
          <h3>
            <Link
              key={index}
              to={`/details/${country.name.common}`}
              className="country-name"
            >
              {country.name.common}
            </Link>
          </h3>
          <div className="country-description">
            <p className="country pop">
              Population: <span>{country.population}</span>
            </p>
            <p className="country region">
              Region: <span>{country.region}</span>
            </p>
            <p className="country capital">
              Capital: <span> {country.capital}</span>
            </p>
          </div>
        </div>
      )): 'No country Found'}
    </div>
  );
};

export default HomePage;
