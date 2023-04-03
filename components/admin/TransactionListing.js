import React from 'react';

function Orders({ currenttab, classes, userInfo, transactions }) {
  
  return (
	<div style={{padding: '16px 16px 36px 16px', width: 'fit-content'}} >
	  <div style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(5, minmax(80px, 150px))'}}>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5"> Code </b>
	    </div>
	    <div className="flex place-items-center p-4">
	      <b className="ml-5"> Phone </b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Amount </b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Date </b>
	    </div>
	    <div className="flex justify-center place-items-center p-4">
	      <b className="ml-4"> Time </b>
	    </div>
	  </div>
	  {transactions.map((transaction) => (
	    <div key={transaction._id} style={{marginBottom: 10, borderRadius: 20, backgroundColor: '#222', color: 'white', justifyContent: 'center', display: 'grid', gap: 10, gridTemplateColumns: 'repeat(5, minmax(80px, 150px))'}}>
	      <div className="p-3 flex place-items-center">
	        <div className="flex gap-3">
	          <div>
	            {transactions.map((o) => o._id).indexOf(transaction._id) + 1}
	          </div>
	          <div>
	            {transaction.Code.slice(0, 5)}
	          </div>
	        </div>	            
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
            {'0'+transaction.Phone.toString().slice(3, 12)}
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
	        {transaction.Amount}
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
	        {transaction.createdAt.slice(0, 10)}
	      </div>
	      <div className="p-3 flex justify-center place-items-center">
	        {transaction.createdAt.slice(11, 19)}
	      </div>
	    </div>
	    ))
	  }
	</div>
  )
}

export default Orders