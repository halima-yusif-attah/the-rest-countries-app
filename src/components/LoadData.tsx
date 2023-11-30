import React, { useState, useEffect, createContext, ReactNode } from "react";

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
interface AllDataProps {
  children: ReactNode;
}


export const AllDataContext = createContext<ApiData[] | undefined>(undefined);


export const AllDataProvider: React.FC<AllDataProps> = ({ children }) => {
  const [data, setData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ApiData[] = await response.json();
        console.log('result', result);
        setData(result);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (data.length === 0) {
    return <p>No data found!.</p>;
  }

  const contextValue: ApiData[] = data;
  
  return (
    <AllDataContext.Provider value={contextValue}>
      {children}
    </AllDataContext.Provider>
  );
};















