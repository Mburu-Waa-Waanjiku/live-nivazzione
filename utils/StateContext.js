import React, { createContext, useState, useContext, } from 'react';
import { useRouter } from 'next/router';

const Context = createContext();

export const StateContext = ({ children }) => {
 const router = useRouter();
 const [value, setValue] = useState('1');
 const handleChange = (event, newValue) => {
        setValue(newValue)
  };
 const [categ, setCateg] = useState('Ankara');
 const handleCateg = (event, newCateg) => {
        setCateg(newCateg)
  };
 const handleBoth = (event, newCateg) => {
     router.push("/");
     setValue('2');
     setCateg(newCateg);
 };

 const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

 const handleAppbar = (event, newCateg) => {
     router.push("/");
     setValue('2');
     setCateg(newCateg);
 };

 const handleBack = (event, newCateg) => {
     setValue('1');
     setCateg(newCateg);
 };   

  const [searchClick, setSearchClick] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);

  const handleClickSearchf = () => {
    setSearchClick(false);
    setSearchBtn(true);
  };
  const handleSearchBtn = () => {
    setSearchClick(true);
    setSearchBtn(false);
  };

  const [openinfos, setOpeninfos] = useState(false);
  const handleOpeninfos = () => {
    setOpeninfos(true);
  }
  const handleOpeninfosHelp = () => {
    setOpeninfos(true);
    router.push("/#helpDesk");
  }
  const handleOpeninfosReturn = () => {
    setOpeninfos(true);
    router.push("/#return");
  }
  const handleOpeninfosShipping = () => {
    setOpeninfos(true);
    router.push("/#shipping");
  }
  const handleCloseinfos = () => {
    setOpeninfos(false);
  }

  return (
    <Context.Provider
      value={{
        handleOpeninfosShipping,
        handleOpeninfosReturn,
        handleOpeninfosHelp,
        openinfos,
        setOpeninfos,
        handleOpeninfos,
        handleCloseinfos,
        searchClick,
        setSearchClick,
        searchBtn,
        setSearchBtn,
        handleClickSearchf,
        handleSearchBtn,
        sidbarVisible,
        setSidebarVisible,
        sidebarOpenHandler,
        sidebarCloseHandler,
        handleAppbar,
        value,
        setValue,
        handleChange,
        categ,
        setCateg,
        handleCateg,
        handleBoth,
        handleBack,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);