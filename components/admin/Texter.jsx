import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  TextField,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import { useSnackbar } from 'notistack';
import { AiOutlineSend } from 'react-icons/ai';
import { BiMessageRounded, BiSolidMessageRounded } from 'react-icons/bi';

function Texter({ product, isAdmintxt }) {
  
  const [Editor, setEditor] = useState(false);
  const [Messages, setMessages] = useState('');
  const [allChats, setAllchats] = useState(null);
  const { state } = useContext(Store);

  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = state;

  const submitHandler = async () => {
    closeSnackbar();
    try {
      const { data } = await axios.put(
        `/api/admin/shopproducts/${product._id}/messages`,
        { message: {
          message: Messages
        }},
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      console.log(data);
      setAllchats(data.message)
      setMessages('');
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

	return (
		<div>{!Editor ?  
		  ( 
          <>
            {isAdmintxt ? 
              <div onClick={() => { setAllchats(product.message); setEditor(true);}} className='p-4 rounded-full bg-grayb text-amber-500 font-bold text-2xl  xsm:grow'>
                <div className='w-full items-center justify-center pag-3 flex'>
                  <BiMessageRounded className='text-2xl'/>
                  <div className='hidden xsm:block'>Message</div>
                </div>
              </div> :
              <>
                {product.message?.length > 0 ?
                  <div onClick={() => { setEditor(true);}} className='relative'>
                    <BiSolidMessageRounded className='text-amber-500 text-3xl'/>
                    <div style={{top: '-3px'}} className='absolute left-4'>
                      <div className='w-5 h-5 relative flex justify-center items-center'>
                        <span className={"text-center rounded-full animate-ping bg-grayb absolute w-full h-full"}></span>
                        <span className={'text-xs flex rounded-full  justify-center content-center items-center relative h-5 w-5 block bg-grayb text-white text-center '}>{product.message.length}</span>
                      </div>
                    </div>
                  </div> : 
                  <BiMessageRounded className='text-2xl'/>
                }
              </>
            }
          </>
      ) :
		  (<div className='p-2' style={{zIndex: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'fixed', top: '0px', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', left: '0px'}}>
			  <div className='rounded-3xl w-full relative bg-white max-w-xl h-full xsm:w-3/4 xsm:w-3/4' style={{ overflow: 'hidden'}}>
          <div className="flex justify-end ">
            <div className=' translate-y-3 z-10' onClick={() => {setEditor(false);}} style={{ cursor: 'pointer', fontSize: 19, fontWeight: 900, padding: '0px 10px' }}>
              x
            </div>
          </div>
          <div style={{height: 'calc(100% - 85px)' }}>
            <div className="h-full mt-3 px-2 relative pb-4 xmsm:px-6">
              <div style={{height: 'calc(100% - 100px)' }} className={'flex flex-col gap-2 overflow-y-scroll overflow-x-hidden '.concat( isAdmintxt ? 'items-end' : 'items-right' )}>
                <>
                  {allChats?.map((chat, index) => (
                    <div key={index} className={'py-2 px-4 rounded-t-3xl rounded-bl-3xl relative text-xl bg-amber-500 text-black'.concat(!isAdmintxt && 'hidden')}>
                      {chat.message}
                      <div className='absolute bottom-0 right-0  border-amber-500 w-8 h-8'>
                      </div>
                    </div>
                  ))}
                </>
                <>
                  {product.message.map((chat, index) => (
                    <div key={index} className={'py-2 px-4 rounded-t-3xl w-fit rounded-br-3xl relative text-xl bg-amber-500 text-black '.concat(isAdmintxt && 'hidden')}>
                      {chat.message}
                      <div className={'absolute  border-amber-500 w-8 h-8 bottom-0 left-0'}>
                      </div>
                    </div>
                  ))}
                </>
              </div>
              {isAdmintxt &&
                <form
                  className='flex items-center sticky bottom-0 w-full max-w-xl p-2 gap-3 justify-between'
                  >
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setMessages(e.target.value)}
                    multiline
                    label={"Text Owner"}
                  ></TextField>
                  <div className=' float-right text-black  bg-amber-500 w-16 h-14 flex justify-center items-center text-3xl rounded-full '>
                    <AiOutlineSend className='translate-x-1' onClick={submitHandler}/>
                  </div>
                </form>
              }
            </div>
          </div>
			  </div>
		  </div>)}
		</div>
	)
}

export default Texter