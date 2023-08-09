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
	    <AiOutlineDownload className='bg-white-lucent text-5xl absolute bottom-5 right-5 p-2.5 rounded-2xl' onClick={() => download(fileUrl, filename)}/>
	  </div>
	)
}

export default downloader