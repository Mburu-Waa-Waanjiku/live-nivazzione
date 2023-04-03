import React from 'react';
import BagID from './BagID';

function Orders({ bags, currenttab, classes, userInfo }) {
  
  const unprocessed = [...bags.filter((bag) => !bag.isChecked)];

  return (
	<div style={{padding: '16px 16px 36px 16px', width: 'fit-content'}} >
	  <div style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(6, minmax(80px, 150px))'}}>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5">User ID</b>
	    </div>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5"> Name</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Items</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Total</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Updated</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4">View details</b>
	    </div>
	  </div>
	  {currenttab == 'All Bags' ? (
	    <>
	    {bags.map((bag) => (
	  	  <div key={bag._id} style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(6, minmax(80px, 150px))'}}>
	        <div className="p-3 flex place-items-center">
	          <div className="flex gap-3">
	            <div>
	              {bags.map((o) => o._id).indexOf(bag._id) + 1}
	            </div>
	            <div>
	              {bag.user ? bag.user._id.substring(20, 24) : 'DELETED USER'}
	            </div>
	          </div>	            
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
              {bag.user ? bag.user.name : 'DELETED USER'}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {bag.orderItems.length}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          Ksh {bag.itemsPrice}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {!bag.isChecked ? (
	          	<button
	              style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
	             >
	              Awaiting Update 
	            </button>) : (
	            <div style={{fontSize: 20, border: '3px solid limegreen', borderRadius: 10, width:20, height: 20, color: 'limegreen', fontWeight: 900}}> 
	              <div style={{ transform: 'translate(2px, -8px)'}}> 🗸 </div>
	            </div>
	            )
	          }
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          <BagID
	            classes={classes}
	            bag={bag}
	            userInfo= {userInfo}
	          />
	        </div>
	      </div>
	  	  ))
	    }
	    </>) : (
	    <>
	    {unprocessed.map((bag) => (
	  	  <div key={bag._id} style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(6, minmax(80px, 150px))'}}>
	        <div className="p-3 justify-center flex place-items-center">
	          <div className="flex gap-3">
	            <div>
	              {bags.map((o) => o._id).indexOf(bag._id) + 1}
	            </div>
	          </div>	            
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
              {bag.user ? bag.user.name : 'DELETED USER'}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {bag.orderItems.length}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          Ksh {bag.itemsPrice}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {!bag.isChecked ? (
	          	<button
	              style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
	             >
	              Awaiting Update
	            </button>) : (
	            <div style={{fontSize: 20, border: '3px solid limegreen', borderRadius: 10, width:20, height: 20, color: 'limegreen', fontWeight: 900}}> 
	              <div style={{ transform: 'translate(2px, -8px)'}}> 🗸 </div>
	            </div>
	            )
	          }
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          <BagID
	            classes={classes}
	            bag={bag}
	            userInfo= {userInfo}
	          />
	        </div>
	      </div>
	  	  ))
	    }
	    </>)
	  }
	</div>
  )
}

export default Orders