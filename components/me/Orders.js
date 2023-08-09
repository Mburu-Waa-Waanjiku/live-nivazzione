import React from 'react';
import OrderID from './OrderId';

function Orders({ classes, userInfo, orderslist }) {

  return (
	<div style={{padding: '16px 16px 36px 16px', width: 'fit-content'}} >
	  <div style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(5, minmax(80px, 150px))'}}>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5"> ID</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Items</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Fulfilled</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Delivered</b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4">View details</b>
	    </div>
	  </div>
	  {orderslist.map((orders) => (
	  	  <div key={orders._id} style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(5, minmax(80px, 150px))'}}>
	        <div className="p-3 flex place-items-center">
	          <div className="flex gap-3">
	            <div>
	              {orderslist.map((o) => o._id).indexOf(orders._id) + 1}
	            </div>
	            <div>
	              {orders._id.substring(20, 24)}
	            </div>
	          </div>	            
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {orders.orderItems.length}
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {!orders.isDelivered ? (
	          	<button
	              style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
	             >
	              On Fulfillment 
	            </button>) : (
	            <div style={{fontSize: 20, border: '3px solid limegreen', borderRadius: 10, width:20, height: 20, color: 'limegreen', fontWeight: 900}}> 
	              <div style={{ transform: 'translate(2px, -8px)'}}> 🗸 </div>
	            </div>
	            )
	          }
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          {!orders.isDelivered ? (
	          	<button
	              style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
	             >
	              Pending...
	            </button>) : (
	            <div style={{fontSize: 20, border: '3px solid limegreen', borderRadius: 10, width:20, height: 20, color: 'limegreen', fontWeight: 900}}> 
	              <div style={{ transform: 'translate(2px, -8px)'}}> 🗸 </div>
	            </div>
	            )
	          }
	        </div>
	        <div className="p-3 flex justify-center place-items-center">
	          <OrderID
	            classes={classes}
	            order={orders}
	            userInfo= {userInfo}
	          />
	        </div>
	      </div>
	  	))
	  }
	</div>
  )
}

export default Orders