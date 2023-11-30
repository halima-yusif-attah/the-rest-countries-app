import React, { useContext } from "react";
import { AllDataContext } from "./LoadData";
import { FilterContext } from "./FilterContext";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";

type CurrencyData = {
  [countryCode: string]: {
    name: string;
  };
};
type NativeData = {
  [key: string]: {
    official: string;
    common: string;
  };
};

interface ApiData {
  map(
    arg0: (country: any) => import("react/jsx-runtime").JSX.Element
  ): React.ReactNode;
  flags: {
    png: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: NativeData;
  };
  population: number;
  region: string;
  capital: string[];
  currencies: CurrencyData;
  subregion: string;
  borders: string[];
  languages: {
    [key: string]: string;
  };
  tld: string[];
  cca3: string;
}

const HomePage = () => {
  const allDataContext = useContext(AllDataContext) || [];
  const data: ApiData[] = allDataContext;
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

  return (
    <div className={`container ${theme === "dark" ? "dark-mode" : ""}`}>
      {data
        .filter((item) => {
          const itemName = item.name.common.toLowerCase();
          const itemRegion = item.region.toLowerCase();
          const isSearchMatch = search
            ? itemName.includes(search.toLowerCase())
            : true;

          const isFilteredDataMatch = filteredData
            ? itemRegion === filteredData.toLowerCase()
            : true;

          return isSearchMatch && isFilteredDataMatch;
        })
        .map((country, index) => (
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
        ))}
    </div>
  );
};

export default HomePage;
