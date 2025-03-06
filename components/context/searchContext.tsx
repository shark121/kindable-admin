'use client';
import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext<any>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
