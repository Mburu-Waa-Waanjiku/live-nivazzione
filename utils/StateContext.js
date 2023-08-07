import React, { createContext, useState, useContext, } from 'react';
import { useRouter } from 'next/router';

const Context = createContext();

export const StateContext = ({ children }) => {
  const router = useRouter();

  const [hometab, setHomeTab] = useState("Trending");
  const [openCategory, SetOpenCategory] = useState(false);
 
  const [route, setRoute] = useState("home");
  const routes = ["home", "categories", "favs", "cart"];

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

 const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
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
  const [page,  setPage] = useState("Wishlist");
  const handlePage = ( event, newPage ) => {
    setPage(newPage);
  }
  const [openId, setOpenId] = useState(false);
  const  handeOpenId = () => {
    setOpenId(true);
  }
  // setitng immovable div while search
  const [divstick, setDivstick] = useState(false);

  return (
    <Context.Provider
      value={{
        openId,
        setOpenId,
        handeOpenId,
        page,
        setPage,
        handlePage,
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
        sidbarVisible,
        setSidebarVisible,
        sidebarOpenHandler,
        sidebarCloseHandler,
        view,
        setView,
        viewOpenHandler,
        viewCloseHandler,
        viewNotes,
        setViewNotes,
        NotesOpenHandler,
        NotesCloseHandler,
        route, 
        setRoute,
        routes,
        hometab, 
        setHomeTab,
        divstick, 
        setDivstick,
        openCategory,
        SetOpenCategory
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);