import React from 'react'

function Loader() {
	return (
		<div className="flex justify-center">
			<div style={{width: 50, height: 50, borderRadius: 50, background: 'linear-gradient(130deg, #9ca3af, #e5e7eb, white)' }} className="animate-spin flex justify-center">
                <div style={{width: 43, height: 43,marginTop: 3, borderRadius: 40, backgroundColor: 'white' }}>

                </div>
			</div>
		</div>
	)
}

export default Loader