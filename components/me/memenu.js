import React from 'react';

function Memenu({ handleChangeBag,page, current, Tabs, Tab, classes, handleCartopen }) {
  return (
	  <div className="w-full flex justify-center " style={{ zIndex: 4, position: 'sticky', top: 76, paddingTop: 10, paddingBottom: 10, backgroundColor: 'rgba(0, 0, 0, 0.12)'}}>
		<div style={{ width: 'calc(100% - 20px)', backgroundColor: 'white'}}>
		  <div style={{padding: 10 }}>
            <Tabs onChange={current} value={page} classes={{ flexContainer: classes.categ, indicator:classes.ndicatenone, scroller: classes.categRut}} sx={{"& .MuiTab-root.Mui-selected": {color:"white", backgroundColor:"#222"},"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} >
              <Tab value="Profile" label="Profile" classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', width: 'calc(100% - 16px)', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              <Tab value="Wishlist" label="Wishlist" classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', width: 'calc(100% - 16px)', maxWidth:360, border: '2px solid #222', transform: 'translateX(-4px)', margin:3}}/>
              <Tab value="My Orders" label="My Orders" classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', width: 'calc(100% - 16px)', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              <Tab value="My Bag" onClick={() => {handleCartopen(); handleChangeBag()}} label="My Bag" classes={{ root: classes.roundedTab }} style={{ fontWeight: 'bold', width: 'calc(100% - 16px)', maxWidth:360, border: '2px solid #222', transform: 'translateX(-4px)', margin:3}}/>
            </Tabs>
		  </div>
		</div>
	  </div>
  )
}

export default Memenu