import React from 'react'

function Friday() {

  const today = new Date();
  const day = today.getDay();
  const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  const currentDay = daylist[day];

  return (
	  <div>
	    {currentDay == daylist[5] ? (
	        <div>
	        </div>
	      ) : (
	        <div>
	        </div>
	      )
	    }
	  </div>
  )
}

export default Friday