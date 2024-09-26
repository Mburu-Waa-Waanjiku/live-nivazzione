'use client'

import React from 'react'
import { GiGraduateCap } from "react-icons/gi";
import { MdCall } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { Slide } from 'react-awesome-reveal';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { Popover } from "antd";

function Homeanimations() {

  const text = <div className="text-xl font-bold pb-4">Socials</div>

  const content = (
    <div className="col-span-2">
      <Link href={'https://www.facebook.com/p/Ruiru-College-of-Catering-and-Management-Courses-RCCMS-100070130419338/'}>
        <div className="text-base flex leading-3 pb-4 gap-1.5"><FaFacebook/> Ruiru College</div>
      </Link>
      <div className="text-base flex leading-4 pb-4 gap-1.5"><AiFillTikTok className='text-xl'/> Ruiru College</div>
    </div>
  )

  return (
    <>
      <div style={{top: '55vh'}} className="text-5xl z-10 sm:text-7xl font-bold w-full text-center text-white absolute ">
        <Slide direction="right absolute" triggerOnce>
          <div className=" pb-4">RUIRU COLLEGE</div>
        </Slide>
        <Slide direction="left absolute" triggerOnce>
          <div className="text-2xl">DESIGNED FOR A PURPOSE</div>
        </Slide>
      </div>
      <Slide  className='z-10 relative' direction="up" triggerOnce>
        <div className="flex justify-center font-bold absolute bottom-12 w-full">
          <div className="rounded-xl flex bg-white bg-white items-center justify-between w-3/4 h-14 p-2 min-w-72">
            <div></div>
            <Link href={'#programs'}>
              <div className="flex flex-col items-center justify-center">
                <GiGraduateCap className="text-3xl"/>
                <span className="leading-3 hidden sm:block mb-1.5">COURSES</span>
              </div>
            </Link>
            <div className="w-0.5 bg-black h-full"></div>
            <div className="flex flex-col items-center justify-center gap-0.5">
              <Link href={'tel:0245001122'}><MdCall className="text-2xl"/></Link>
              <span className="leading-3 hidden sm:block mb-1.5">CONTACTS</span>
            </div>
            <div className="w-0.5 bg-black h-full"></div>
            <Popover placement="topRight" title={text} content={content}>
              <div className="flex flex-col items-center justify-center gap-0.5">
                <IoShareSocialSharp className="text-2xl"/>
                <span className="leading-3 hidden sm:block mb-1.5">SOCIALS</span>
              </div>
            </Popover>
            <div className="w-0.5 bg-black h-full"></div>
            <Link href={'https://www.google.com/maps/dir//Wakulima+House+campus,2nd+Floor+Opp+Ruiru+Main+Stage,+Ruiru/@-1.1676938,36.8855462,22634m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x182f47bdac01eb0d:0x331a5c6c306f6ed6!2m2!1d36.9679515!2d-1.1676885?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D'}>
              <div className="flex flex-col items-center justify-center gap-10.5">
                <IoLocationSharp className="text-2xl"/>
                <span className="leading-3 hidden sm:block mb-1.5">LOCATION</span>
              </div>
            </Link>
            <div></div>
          </div>
        </div>
      </Slide>
    </>
  )
}

export default Homeanimations