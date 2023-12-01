import React, { useContext } from "react";
import { FilterContext } from "./FilterContext";
import { AllDataContext } from "./LoadData";
import { ThemeContext } from "./ThemeContext";
import { useLocation } from "react-router-dom";

const Buttons = () => {
  const allDataContext = useContext(AllDataContext) || [];
  const context = useContext(FilterContext);
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const themecontext = useContext(ThemeContext);

  if (!themecontext) {
    return null;
  }
  const { theme } = themecontext;

  if (!isHomepage) {
    return null;
  }

  if (!context) {
    return null;
  }
  const { handleSearch, handleFilter } = context;

  return (
    <div className="btns">
      <div className="search-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
            fill="#848484"
          />
        </svg>

        <input
          type="text"
          name="search"
          placeholder="Search for a country ..."
          className={`input search-input ${
            theme === "dark" ? "dark-mode" : ""
          }`}
          onChange={handleSearch}
        />
      </div>

      <div className="filter-container">
        <select
          aria-label="Choose an option"
          onChange={handleFilter}
          className={`input filter-input ${
            theme === "dark" ? "dark-mode" : ""
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            Filter by Region
          </option>
          {allDataContext
            ? Array.from(new Set(allDataContext.map((d) => d.region))).map(
                (uniqueRegion, index) => (
                  <option
                    key={index}
                    value={uniqueRegion}
                    className="reg-options"
                  >
                    {uniqueRegion}
                  </option>
                )
              )
            : null}
        </select>
      </div>
    </div>
  );
};

export default Buttons;
