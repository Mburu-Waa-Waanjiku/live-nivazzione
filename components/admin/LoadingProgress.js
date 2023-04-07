import React, { useState } from 'react';

function LoadingProgress({percent}) {

  return (
	<div style={{display: 'flex', gap: 4,  width: '100%', position: 'fixed' }}>
	  <div style={{flexGrow: 1,  width: '100%', height: '3px', backgroundColor: 'white' }}>
		  <div style={{width: `${percent}%`, height: '100%', backgroundColor: 'rgb(52, 72, 197)', borderRadius: '50px'}}>
		  </div>
	  </div>
	</div>
  )
}

export default LoadingProgress