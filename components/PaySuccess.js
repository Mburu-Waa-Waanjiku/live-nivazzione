import React from 'react'
import { Button } from '@material-ui/core';
import { AiOutlineShopping } from 'react-icons/ai';

function PaySuccess() {
	return (
		<div>
		    <div style={{color: "#7ac142"}} className="home-ft w-full justify-self-stretch">
                Payment Succesfull
            </div>
			<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{borderRadius: '50px', margin: 40, padding: "8px 35px"}}
               >
                Complete 
                <div style={{position: "relative", height: 30}}>
                  <AiOutlineShopping style={{fontSize: 25, position: "relative", top: 0, marginLeft: 10}}/>                
                  <div style={{height: 20, display:"inline-block", position: "relative", fontSize: 12, top: "-29px", left: "-3px", border: "3px solid #242526" }}>
                    +
                  </div>
                </div>
              </Button>
            </div>
		</div>
	)
}

export default PaySuccess