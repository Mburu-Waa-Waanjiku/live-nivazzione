import React from 'react'

function ProgressBar({percent}) {
	return (
		<div style={{display: 'flex', gap: 4}}>
		  <div style={{flexGrow: 1,  width: '65%', height: '8px', backgroundColor: 'white', border: '1px solid #222', borderRadius: '50px'}}>
			<div style={{width: `${percent}%`, height: '100%', backgroundColor: '#222', borderRadius: '50px'}}>
			</div>
		  </div>
		  <div style={{flexGrow: 1, width: '35%', display: 'flex', gap: 4, fontSize: 11, lineHeight: 1.2}}>
		    <div>{`${percent}%`}</div> 
		    <div> 
		      <b> 
		        SOLD 
		      </b>
		    </div> 
		  </div>
		</div>
	)
}

export default ProgressBar