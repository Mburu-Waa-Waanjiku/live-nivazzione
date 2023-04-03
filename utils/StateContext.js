import React, { createContext, useState, useContext, } from 'react';
import { useRouter } from 'next/router';

const Context = createContext();

export const StateContext = ({ children }) => {
 const router = useRouter();

 const today = new Date();

  const [value, setValue] = useState("Cart");
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  const handleChangeBag = () => {
    setValue("Bag")
  };

 const [viewNotes, setViewNotes] = useState(false);
 const NotesOpenHandler = () => {
    setViewNotes(true);
  };
  const NotesCloseHandler = () => {
    setViewNotes(false);
  };

 const [view, setView] = useState(false);
 const viewOpenHandler = () => {
    setView(true);
  };
  const viewCloseHandler = () => {
    setView(false);
  };
  
 const [happyHour, setHappyHour] = useState(false);
 const currentTime = today.getHours();
 if ( 21 > currentTime && currentTime > 20 ) {
  setHappyHour(true);
 };

 const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
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
  const [cartopen, setCartopen] = useState(false);
  const handleCartopen = () => {
    setCartopen(true)
  }
  const handleCartclose = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCartopen(false)
  }
  const [openp4b, setOpenp4b] = useState(false);
  const handleOpenp4b = () => {
    setOpenp4b(true)
  };
  const handleClosep4b = () => {
    setOpenp4b(false)
  }
  const [payp4b, setPayp4b] = useState(false);
  const handleOpenPayp4b = () => {
    setPayp4b(true)
  };
  const handleClosePayp4b = () => {
    setPayp4b(false)
  }
  const [bag, setBag] = useState(false);
  const handleOpenBag = () => {
    setBag(true)
  }
  const handleCloseBag = () => {
    setBag(false)
  }
  const [makeOrder, setMakeOrder] = useState(false);
  const handleCollect = () => {
    setMakeOrder(true)
  }
  const handleClosecollect = () => {
    setMakeOrder(false)
  }
  const [collectpay, setCollectpay] = useState(false);
  const handleOpenCP = () => {
    setCollectpay(true)
  }
  const handleCloseCP = () => {
    setCollectpay(false)
  }
  const [normalorderP, setNormalorderP] = useState(false);
  const handleOpenNormalOP = () => {
    setNormalorderP(true)
  }
  const handleCloseNormalOP = () => {
    setNormalorderP(false)
  }
  const [login, setLogin] = useState(false);
  const openLogin = () => {
    setLogin(true)
  } 
  const closeLogin = () => {
    setLogin(false)
  }

  return (
    <Context.Provider
      value={{
        login,
        setLogin,
        openLogin,
        closeLogin,
        normalorderP,
        setNormalorderP,
        handleOpenNormalOP,
        handleCloseNormalOP,
        collectpay,
        setCollectpay,
        handleOpenCP,
        handleCloseCP,
        makeOrder,
        setMakeOrder,
        handleCollect,
        handleClosecollect,
        bag,
        setBag,
        handleOpenBag,
        handleCloseBag,
        payp4b,
        setPayp4b,
        handleOpenPayp4b,
        handleClosePayp4b,
        openp4b,
        setOpenp4b,
        handleOpenp4b,
        handleClosep4b,
        cartopen,
        setCartopen,
        handleCartopen,
        handleCartclose,
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
        setHappyHour,
        view,
        setView,
        viewOpenHandler,
        viewCloseHandler,
        viewNotes,
        setViewNotes,
        NotesOpenHandler,
        NotesCloseHandler,
        value,
        setValue,
        handleChange,
        handleChangeBag,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);