import React, { ReactNode, createContext, useState } from 'react';

interface FilterContextProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredData: string;
  handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProps> = ({ children }) => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState('');
 
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value.toLowerCase());
    };


  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = e.target.value.toLowerCase();
    setFilteredData(selectedRegion);
  };

  const contextValue: FilterContextProps = {
    search,
    handleSearch,
    filteredData,
    handleFilter
  };

  return (
    <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
  );
};




