import React, { useState } from 'react';
import Bagcomponent from './BagLinstings';

function Orders({ fetchBags, userInfo, admin, classes, bags, Tabs, Tab, TabPanel, TabContext, current }) {
  
  const orderTabs = ['All Bags', 'Not Updated']
  const [currenttab,  setTab] = useState('All Bags');
  const setCurrentTab = ( event, newPage ) => {
  	setTab(newPage)
  }

  return (
	<div className={current == "Bags" ? "bannerwidth pt-1" : "hidden pt1"}>
	  <TabContext value={currenttab}>
        <div className={admin.tabsfloat + " " + "grid justify-center"}>
          <Tabs onChange={setCurrentTab} variant="scrollable" scrollButtons="auto"  value={currenttab} classes={{ indicator:classes.ndicatenone}} sx={{"& .MuiTab-root.Mui-selected": {color:"white", backgroundColor:"#222"},"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} >
            {orderTabs.map((tab)=>(
              <Tab value={tab} label={tab} classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              ))
            }
          </Tabs>
        </div>
        <TabPanel value='All Bags' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 0, width: '100%' }}>
          <div style={{ overflow: 'scroll', gridTemplateColumns: '1fr' }} className={admin.productsgridding}>
            <div className="flex justify-center">
              <Bagcomponent
                bags={bags}
                classes={classes}
                userInfo={userInfo}
                currenttab={currenttab}
                fetchBags={fetchBags}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value='Not Updated' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 0, width: '100%' }}>
          <div style={{ overflow: 'scroll', gridTemplateColumns: '1fr' }} className={admin.productsgridding}>
            <div className="flex justify-center">
              <Bagcomponent
                bags={bags}
                classes={classes}
                userInfo={userInfo}
                currenttab={currenttab}
                fetchBags={fetchBags}
              />
            </div>
          </div>
        </TabPanel>
	  </TabContext>
	</div>
  )
}

export default Orders