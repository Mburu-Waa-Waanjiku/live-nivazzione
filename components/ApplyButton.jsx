'use client'

import React, { useState } from 'react'
import Apply from './Apply';


function ApplyButton({ shortCourse, course, homeApply, applyTitle, index }) {

  const [open, setOpen] = useState(false);
  const [openSchool, setOpenschool] = useState(false);

  const openLogger = () => {
    setOpen(true);
  }

  const closeLogger = () => {
    setOpen(false);
    console.log(open);
  }



  return (
    <>
      { homeApply ?
        <div onClick={openLogger} style={{transform: 'translate(-4vw)'}} className="px-4 z-10 cursor-auto rounded-full rounded-full title-color absolute top-16 sm:top-20 title-gradien right-0 text-white text-base w-32 font-bold pb-2 pt-0 text-center ">
          Apply
        </div> : shortCourse ?
        <p onClick={openLogger} className="px-4 cursor-auto w-24 z-10 text-center pb-1.5 font-bold border-2 border-white">Apply</p> :
        <div className='flex z-10 justify-between'>
          <div onClick={openLogger} className="title-gradien cursor-auto  mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Apply</div>
          <div onClick={()=> {openSchool ? setOpenschool(false) : setOpenschool(true)}} className="title-gradien cursor-auto mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">{!openSchool ? 'View more' : 'Close'}</div>
        </div>
      }
      {open && 
        <>
          <Apply applyTitle={applyTitle} closeLogger={closeLogger}/>
        </>
      }
      {!shortCourse && !homeApply &&
        <>
          {openSchool &&
            <div className='flex mt-8 flex-col'>
              {course.levels.map((course, index) => (
                <div className='w-full mb-8 title-text bg-highlight px-3 pt-3 pb-6'>
                  <h3 className='w-full text-center text-3xl font-medium pb-3'>{course.level}</h3>
                  {course.requirements.length > 0 &&
                    <>
                      <h5 className='text-2xl font-medium'>Requirements</h5>
                      <ul>
                        {course.requirements?.map((requirement, index) => (
                          <li>{requirement}</li>
                        ))}
                      </ul>
                    </>
                  }
                  <h5 className='text-2xl font-medium pb-2'>Study Areas</h5>
                  <ul style={{listStyleType: 'disc'}} className='ml-5'>
                    {course.units?.map((requirement, index) => (
                      <li className='text-base' key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          }
        </>
      }
    </>
  )
}

export default ApplyButton