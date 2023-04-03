import React, { useState } from 'react'
import { AiOutlineDownload } from 'react-icons/ai';
import useDownloader from "react-use-downloader";

function downloader({original, name}) {
  
  const { size, elapsed, percentage, download,
        cancel, error, isInProgress } =
    useDownloader();

   const fileUrl = original;
  const filename = name + ".png";

  return (
	  <div>
	    <AiOutlineDownload onClick={() => download(fileUrl, filename)} style={{fontSize:"30px", position:"absolute", bottom:"20px", right:"20px", padding:"10px", borderRadius:"20px", backgroundColor:"rgba(255, 255, 255, 0.7)"}} />
	  </div>
	)
}

export default downloader