import React, { useState } from 'react';
import AdminProds from './BannerProduct';
import EmptyBanner from './EmptyBanner';

function Products({ setFetchProgres, setShow, setBanners, admin, Navigation, FreeMode, Thumbs, Pagination, Autoplay, Swiper, SwiperSlide, classes, banners, Tabs, Tab, TabPanel, TabContext, current}) {
  
  const producttabs = [ 'All  Banners' ];
  const [showCreate, setshowCreate] = useState(false);
  const [currenttab,  setTab] = useState('All  Banners');
  const setCurrentTab = ( event, newPage ) => {
  	setTab(newPage)
  }

  return (
	  <div className={current == "Banners" ? "bannerwidth pt-1" : "hidden pt1"}>
      <TabContext value={currenttab}>
        <div className={admin.tabsfloat + " " + "grid justify-center"}>
          <Tabs onChange={setCurrentTab} variant="scrollable" scrollButtons="auto"  value={currenttab} classes={{ indicator:classes.ndicatenone}} sx={{"& .MuiTab-root.Mui-selected": {color:"white", backgroundColor:"#222"},"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} >
            {producttabs.map((tab)=>(
              <Tab 
                value={tab} 
                label={tab} 
                classes={{ root: classes.roundedTab }} 
                style={{ fontWeight: 'bold', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              ))
            }
          </Tabs>
        </div>
        <TabPanel value='All  Banners' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          {!showCreate ? <div onClick={() => {setshowCreate(true)}} className={admin.searchbtn} style={{backgroundColor: "white", position: "fixed", boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)", padding: 10 , zIndex: 1200, right: 0, height: 'fit-content', fontWeight: 700 }}> Create </div> :
            <EmptyBanner
              setFetchProgres={setFetchProgres}
              setBanners={setBanners}
              setShow={setShow}
              setshowCreate={setshowCreate}
            />
          }
          <div className={admin.productsgridding}>
            {banners.map((banner) =>(
              <AdminProds
               banner={banner}
               Navigation={Navigation}
               FreeMode={FreeMode}
               Thumbs={Thumbs}
               Pagination={Pagination}
               Autoplay={Autoplay}
                Swiper={Swiper}
               admin={admin}
               SwiperSlide={SwiperSlide}
               setFetchProgres={setFetchProgres}
               setShow={setShow}
               setBanners={setBanners}
              />
              ))
            }
          </div>
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default Products

