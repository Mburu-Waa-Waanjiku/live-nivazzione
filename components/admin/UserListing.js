import React from 'react';
import UserOrders from './UserOrders';
import BagID from './BagID';

function Orders({ bags, orders, classes, users }) {

  return (
	<div style={{padding: '16px 16px 36px 16px', width: 'fit-content'}} >
	  <div style={{marginBottom: 10, borderRadius: 20, backgroundColor: 'white', color: 'black', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(4, minmax(100px, 170px))'}}>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5"> Name </b>
	    </div>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5"> Email </b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Orders </b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Bags </b>
	    </div>
	  </div>
	  {users.map((user) => (
	    <div key={user._id} style={{marginBottom: 10, borderRadius: 20, backgroundColor: 'white', color: 'black', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(4, minmax(100px, 170px))'}}>
	      <div className="p-3 flex place-items-center">
	        <div className="flex gap-3">
	          <div>
	            {users.map((o) => o._id).indexOf(user._id) + 1}
	          </div>
	          <div>
	            {user.name}
	          </div>
	        </div>	            
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
            {user.email}
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
	        <UserOrders
	          user={user}
	          orders={orders}
	          classes={classes}
	        />
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
	        <BagID
	          classes={classes}
            bag = {bags.find( x => x.user._id == user._id)}
	        />
	      </div>
	    </div>
	    ))
	  }
	</div>
  )
}

export default Orders