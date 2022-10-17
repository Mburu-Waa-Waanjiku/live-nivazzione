import React, { createContext, useState, useContext, } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
   const [clicked, setClicked] = useState(false);
   const handleSearch = () => setClicked(!clicked);
   

  return (
    <Context.Provider
      value={{
        clicked,
        setClicked,
        handleSearch
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);