import React, { useState } from 'react';
import Ordercomponent from './OrderListings';
import Shopdiv from './Shopdiv';

function Orders({ userInfo, admin, classes, orders, Tabs, Tab, TabPanel, TabContext, current }) {
  
  const orderTabs = ['All Orders', 'Unprocessed Orders', 'Shop Orders']
  const [currenttab,  setTab] = useState('All Orders');
  const setCurrentTab = ( event, newPage ) => {
  	setTab(newPage)
  }

  return (
	<div className={current == "Orders" ? "bannerwidth pt-1" : "hidden pt1"}>
	  <TabContext value={currenttab}>
        <div className={admin.tabsfloat + " " + "grid justify-center"}>
          <Tabs onChange={setCurrentTab} variant="scrollable" scrollButtons="auto"  value={currenttab} classes={{ indicator:classes.ndicatenone}} sx={{"& .MuiTab-root.Mui-selected": {color:"white", backgroundColor:"#222"},"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} >
            {orderTabs.map((tab)=>(
              <Tab key={tab} value={tab} label={tab} classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              ))
            }
          </Tabs>
        </div>
        <TabPanel value='All Orders' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 0, width: '100%' }}>
          <div style={{ overflow: 'scroll', gridTemplateColumns: '1fr' }} className={admin.productsgridding}>
            <div className="flex justify-center">
              <Ordercomponent
                orderslist={orders}
                classes={classes}
                userInfo={userInfo}
                currenttab={currenttab}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value='Unprocessed Orders' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 0, width: '100%' }}>
          <div style={{ overflow: 'scroll', gridTemplateColumns: '1fr' }} className={admin.productsgridding}>
            <div className="flex justify-center">
              <Ordercomponent
                orderslist={orders}
                classes={classes}
                userInfo={userInfo}
                currenttab={currenttab}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value='Shop Orders' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 0, width: '100%' }}>
          <div style={{ overflow: 'scroll', gridTemplateColumns: '1fr' }} className={admin.productsgridding}>
            <div className={"grid place-items-center p-2 gap-3 grid-cols-1 w-full xmd:grid-cols-2 "}>
              {orders.distinctShop?.map((shop, index) => (
                <Shopdiv
                  key={index}
                  shop={shop}
                  orders={orders?.ordersItms}
                />
              ))}
            </div>
          </div>
        </TabPanel>
	  </TabContext>
	</div>
  )
}

export default Orders