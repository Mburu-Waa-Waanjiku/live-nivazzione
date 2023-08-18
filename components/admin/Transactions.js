import React, { useState } from 'react';
import Ordercomponent from './TransactionListing';

function Orders({ userInfo, admin, classes, transactions, Tabs, Tab, TabPanel, TabContext, current }) {
  
  const orderTabs = ['All Transactions']
  const [currenttab,  setTab] = useState('All Transactions');
  const setCurrentTab = ( event, newPage ) => {
  	setTab(newPage)
  }

  return (
	<div className={current == "Transactions" ? "bannerwidth pt-1" : "hidden pt1"}>
	  <TabContext value={currenttab}>
        <div className={admin.tabsfloat + " " + "grid justify-center"}>
          <Tabs onChange={setCurrentTab} variant="scrollable" scrollButtons="auto"  value={currenttab} classes={{ indicator:classes.ndicatenone}} sx={{"& .MuiTab-root.Mui-selected": {color:"white", backgroundColor:"#222"},"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} >
            {orderTabs.map((tab, index)=>(
              <Tab key={index} value={tab} label={tab +' '+transactions.length} classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              ))
            }
          </Tabs>
        </div>
        <TabPanel value='All Transactions' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 0, width: '100%' }}>
          <div style={{ overflow: 'scroll', gridTemplateColumns: '1fr' }} className={admin.productsgridding}>
            <div className="flex justify-center">
              <Ordercomponent
                transactions={transactions}
                classes={classes}
                userInfo={userInfo}
                currenttab={currenttab}
              />
            </div>
          </div>
        </TabPanel>
	  </TabContext>
	</div>
  )
}

export default Orders