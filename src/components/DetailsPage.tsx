import React, { useContext } from 'react';
import { AllDataContext } from "./LoadData"; 
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './ErrorFallback';


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


const DetailsPage = () => {
    const { countryName } = useParams();
    const data = useContext(AllDataContext) || [];
    const themecontext = useContext(ThemeContext);

    if (!themecontext) {
      return null;
    }
    const { theme } = themecontext;

    const country = data.find((c) => c.name.common === countryName);
    
    const getBorderCountryNames = (country: ApiData) => {
      const borderCountryNames = country.borders.map((border) => {
        const borderCountry = data.find((c) => c.cca3 === border);
        return borderCountry ? borderCountry.name.common : "Unknown Country";
      });

      return borderCountryNames;
    };

     if (!country) {
    return <p>Country not found</p>;
  }

  return (
    <div className={`details-page ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="to-home">
        <span className="back-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="13.3"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
              fill=""
            />
          </svg>
        </span>

        <Link to="/" className="back">
          <p>Back</p>
        </Link>
      </div>

      <div className="details-wrapper">
        <div className="detail-country-logo">
          <img
            src={country.flags.png}
            alt={`Country Flag ${country.name.common}`}
            width="100"
            height="100"
          />
        </div>

        <div className="details-text">
          <div className="title">
            <h3 className="">{country.name.common}</h3>
          </div>

          <div className="main-description">
            <div className="country-detail-description one">
              <p className="native">
                <span>Native Name: </span>
                {
                  Object.values(country.name.nativeName)[
                    Object.values(country.name.nativeName).length - 1
                  ].common
                }
              </p>
              <p className="country-pop">
                <span>Population: </span>
                {country.population}
              </p>
              <p className="country-region">
                <span>Region: </span>
                {country.region}
              </p>
              <p>
                <span>Sub Region: </span>
                {country.subregion}
              </p>
              <p className="country-capital">
                <span>Capital: </span>
                {country.capital}
              </p>
            </div>

            <div className="country-detail-description two">
              <p>
                <span>Top Level Domain: </span>
                {country.tld}
              </p>
              <p>
                <span>Currencies: </span>
                {Object.values(country.currencies)[0].name}
              </p>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <p>
                  <span>Languages: </span>
                  {Object.values(country.languages).length === 1
                    ? Object.values(country.languages)[0]
                    : Object.values(country.languages).join(", ")}
                </p>
              </ErrorBoundary>
            </div>
          </div>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="borders">
              <h5 className="border-country-title">border countries: </h5>
              <div className="border-group">
                {!country.borders ? (
                  <div className="border-country">No borders</div>
                ) : (
                  getBorderCountryNames(country)
                    .slice(0, 3)
                    .map((b) => (
                      <div className="border-country" key={b}>
                        <Link to={`/details/${b}`} className="border-names">
                          <p>{b}</p>
                        </Link>
                      </div>
                    ))
                )}
              </div>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage