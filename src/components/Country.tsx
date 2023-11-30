import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AllDataContext } from "./LoadData"; 

const Country = () => {
    const allDataContext = useContext(AllDataContext) || [];
    const data = allDataContext;


  return (
    <div className="country-container">
      {data.map((country, index) => (
        <Link key={index} to={`/${country.name.common}/details`}>
          {country.name.common}
        </Link>
      ))}
    </div>
  );
}

export default Country