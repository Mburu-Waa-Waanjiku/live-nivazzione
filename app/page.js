import Image from "next/image";
import { CgMenuMotion } from "react-icons/cg";
import Link from "next/link";
import Footer from "@/components/Footer";
import ApplyButton from "@/components/ApplyButton";
import Homeanimations from "@/components/Homeanimations";
import Extenddivs from "@/components/Extenddivs";
import { RiWhatsappFill } from "react-icons/ri";
import HomeSlider from "@/components/HomeSlider";

export default function Home() {
  
  const Schools = [
    'School-Of-Hospitality-Management',
    'School-Of-Tourism',
    'School-Of-Fashion-Design',
    'School-Of-Business',
    'School-Of-ICT',
    'School-Of-Front-Office',
    'School-Of-Cosmetology',
  ]

  return (
    <div className="w-full  overflow-hidden h-full">
      <HomeSlider/>
      <div style={{width: '66%'}} className="rounded-es-3xl z-10 h-9 overflow-hidden title-color absolute top-0 right-0 p-2">
        <p className="text-sm font-sans leading-6 text-white text-center">
          <span className="hidden leading-4  sm:block">Intake happening on January, March, May, July & September</span>
          <marquee className="sm:hidden leading-4 block">Intake happening on January, March, May, July & September</marquee>
        </p>
      </div>
      <ApplyButton homeApply={true} />
      <div className="w-full py-1 z-10 px-4 h-10 flex justify-start slg:justify-between text-white title-color absolute top-36 sm:top-40">
        <div></div>
        <CgMenuMotion className="mb-4 text-3xl min-w-8 mr-4 block slg:hidden"/>
        <div className={"flex font-sans overflow-x-auto overflow-y-hidden whitespace-nowrap topbar-webkit slg:justify-between w-0 slg:w-full gap-6 flex-grow "}>
          <Link href={'/about-us'}><span >About Us</span></Link>
          <Link href={'#programs'}><span >Programs</span></Link>
          <span >Admission</span>
          <span >Internships</span>
          <Link href={'/events-&-news'}><span >Student Life </span></Link>
          <Link href={'/events-&-news'}><span >News & Events </span></Link>
          <Link href={'#contacts'}><span >Contact Us</span></Link>
        </div>
        <div></div>
      </div>
      <div className="logo min-w-24 z-10 sm:min-w-28 min-h-24 sm:min-h-28 max-w-32 max-h-32 absolute top-7 sm:top-8">
        <Image alt="RUIRU COLLEGE LOGO" layout="fill" src={'/a29d2abffaa3667be2c61a94a0ccc015.png'} />
      </div>
      <Homeanimations/>
      <div id='programs'></div>
      {/* start of boma template */}
      <div className="bg-highlight px-3 pt-5 pb-6">
        <div className="text-2xl title-text sm:text-center mb-3">Discover Ruiru College of Catering & Managment Studies</div>
        <div className="flex sm:justify-center">
          <div className="title-color text-xl w-32 pt-0.5 pb-2 text-center text-white ">Schools</div>
        </div>
      </div>
      {/* school of catering */}
      <div className="flex mb-8 p-6 mt-8 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Hospitality & Culinar​y art​s</div>
        <div className="slg:w-1/2 hidden font-medium slg:flex h-auto font-sans slg:h-96 w-full   items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Hospitality & Culinar​y art​s</div>
            <p className="pb-6 title-text">Our hospitality  courses offer comprehensive pathway to success in the vibrant dynamic hospitality industry.</p>
            <p className="title-text">Our strong partnerships with leading organisations provide you with unparalleled opportunities for growth</p>
            <Link href={`/${Schools[0]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
        <div className="w-full flex justify-center scaler xxsm:!scale-75 mlg:!scale-100  items-center h-72 slg:w-1/2">
          <Image alt="school of catering" style={{transform: 'translate(-70px, -50px)'}} className="absolute border-4 border-white m-1 z-10" width={300} height={200} src={'/20240313_151957.jpg'}/>
          <Image alt="school of catering" style={{transform: 'translate(110px, 20px)'}} className="absolute border-4 border-white z-20" width={240} height={220} src={'/20240313_115726.jpg'}/>
          <Image alt="school of catering" style={{transform: 'translate(-75px, 100px)'}} className="absolute" width={130} height={230} src={'/20240628_193120.jpg'}/>
        </div>
        <div className="slg:w-1/2 h-auto font-medium font-sans slg:h-96 w-full flex slg:hidden  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Hospitality & Culinar​y art​s</div>
            <p className="pb-6 title-text">Our hospitality  course offer comprehensive pathway to success in the vibrant dynamic hospitality industry.</p>
            <p className="title-text">Our strong partnerships with leading organisations provide you with unparalleled opportunities for growth</p>
            <Link href={`/${Schools[0]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      {/* School Of Beauty And Cosmetology */}
      <div className="flex mb-8 p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School Of Cosmetology </div>
        <div className="flex justify-center items-center slg:w-1/2">
          <div class="col-md-6  max-w-96">
            <div class="row mt-4 mt-md-0">
              <div class="col-5 offset-1 pl-4 pr-2 home-gallery mb-3 align-self-end">
                <img class=" img-fluid" src="./IMG-20240710-WA0021.jpg" alt="school of fashion"/>
              </div>
              <div class="col-6 px-2 mb-3">
                  <img class=" img-fluid" src="./hair-dressing.jfif" alt="school of fashion"/>
              </div>
              <div class="col-7  px-2 mb-3">
                <div class=" title-color flex-col flex justify-center min-h-40 p-2 p-sm-3 p-lg-4 p-xl-5 text-white">
                  <h3 className="text-2xl">Become a <br/>professional in <br/> beauty & cosmetology</h3>
                </div>
              </div>
              <div class="col-5 align-self-start pl-2 pr-8 mb-3">
                  <img class="border-radius-3 img-fluid" src="./makeup.jpg" alt="school of fashion"/>
              </div>
            </div>
          </div>
        </div>
        <div className="slg:w-1/2 font-medium font-sans h-auto slg:h-96 w-full flex  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School Of Cosmetology </div>
            <p className="pb-6 title-text">Transforming your passion for beauty into a rewarding career with our comprehensive cosmetology courses designed for you.</p>
            <p className="title-text">Get necessary skills, knowledge & hands on experience in hairdressing and beauty to help you excel in various roles within the field.</p>
            <Link href={`/${Schools[6]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      {/* school of tourisim */}
      <div className="flex mb-8 p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full mt-6 block slg:hidden mb-6 text-3xl  pt-1 pb-2 text-center text-white ">School of Tourism and ​Travels</div>
        <div className="slg:w-1/2 h-auto font-medium font-sans slg:h-96 w-full hidden slg:flex   items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color mt-6 slg:block hidden mb-6 text-3xl  pt-1 pb-2 text-center text-white ">School of Tourism and ​Travels</div>
            <p className="pb-4 title-text">Unlock the secrets of the tourism industry and propel your career forward with our comprehensive tourism courses.</p>
            <p className="pb-4 title-text">Our courses offer opportunities for international travel, cultural immersions & exposure to  diverse tourism career.</p>
            <Link href={`/${Schools[1]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
        <div className="w-full flex justify-center scaler xxsm:!scale-75 mlg:!scale-100  items-center h-72 slg:w-1/2">
          <Image alt="school of tourisim " style={{transform: 'translate(65px, -50px)'}} className="absolute border-4 border-white m-1 z-10" width={300} height={200} src={'/79fbc75c0a8b0b5ac8fdf34bc9ee3592.jpg'}/>
          <Image alt="school of tourisim " style={{transform: 'translate(-90px, 20px)'}} className="absolute border-4 border-white z-20" width={280} height={220} src={'/70d27ecabc0a6707fe2a9460dcb537fe.jpg'}/>
          <Image alt="school of tourisim " style={{transform: 'translate(85px, 150px)'}} className="absolute" width={130} height={230} src={'/8c947fbbd6170be92f34478bbf6ca05e.jpg'}/>
        </div>
        <div className="slg:w-1/2 h-auto font-medium font-sans slg:h-96 w-full flex slg:hidden  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color mt-6 slg:block hidden mb-6 text-3xl  pt-1 pb-2 text-center text-white ">School of Tourism and ​Travels</div>
            <p className="pb-4 title-text">Unlock the secrets of the tourism industry and propel your career forward with our comprehensive tourism courses.</p>
            <p className="pb-4 title-text">Our courses offer opportunities for international travel, cultural immersions & exposure to  diverse tourism career.</p>
            <Link href={`/${Schools[1]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      {/* school of fashion */}
      <div className="flex mb-8 p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Fashion design</div>
        <div className="flex justify-center items-center slg:w-1/2">
          <div class="col-md-6  max-w-96">
            <div class="row mt-4 mt-md-0">
              <div class="col-5 offset-1 pl-4 pr-2 home-gallery mb-3 align-self-end">
                <img class=" img-fluid" src="./2ec8cfe15ae689b59e0ecfe7cf127190.jpg" alt="school of fashion"/>
              </div>
              <div class="col-6 px-2 mb-3">
                  <img class=" img-fluid" src="./8df6bfb5f8a77874ef7a51d698827667.jpg" alt="school of fashion"/>
              </div>
              <div class="col-7  px-2 mb-3">
                <div class=" title-color flex-col flex justify-center min-h-40 p-2 p-sm-3 p-lg-4 p-xl-5 text-white">
                  <h3 className="text-2xl">Building character and inspiring careers</h3>
                </div>
              </div>
              <div class="col-5 align-self-start pl-2 pr-10 mb-3">
                  <img class="border-radius-3 img-fluid" src="./666e0b80a3c87c51a35f226b8ed47274.png" alt="school of fashion"/>
              </div>
            </div>
          </div>
        </div>
        <div className="slg:w-1/2 h-auto font-medium font-sans slg:h-96 w-full flex  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Fashion design</div>
            <p className="pb-6 title-text">RCCMS is here to nurture your interest in ​the hospitality industry & empower your ​ambitions.</p>
            <p className="title-text">There is nothing that can stop you from ​achieving what you want, except yourself. If ​you devote yourself to it you will achieve ​your goal.</p>
            <Link href={`/${Schools[2]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      {/* school of Business*/}
      <div className="flex mb-8 p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Business</div>
        <div className="slg:w-1/2 font-medium font-sans h-auto slg:h-96 w-full hidden slg:flex  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Business</div>
            <p className="pb-6 title-text">Step into the word of business with confidence & expertise by enrolling in a dynamic business courses designed for individuals at all stages of your career.</p>
            <p className="pb-6 title-text">Our programs provide the knowledge, skills & insights necessary to thrive in todays competitive world</p>
            <Link href={`/${Schools[3]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
        <div className="w-full flex justify-center scaler xxsm:!scale-75 mlg:!scale-100  items-center h-72 slg:w-1/2">
          <Image alt="school of Business" style={{transform: 'translate(20px, 0px)'}} className="absolute border-4 border-white m-1 z-10" width={300} height={400} src={'/ce1c35c07233d4a240d31e0875810db9.png'}/>
          <div style={{transform: 'translate(-80px, 150px)'}} className="p-3 title-color h-32 w-48 text-3xl text-white z-10">Become a leading ​business mind</div>
        </div>
        <div className="slg:w-1/2 font-medium font-sans h-auto slg:h-96 w-full flex slg:hidden  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Business</div>
            <p className="pb-6 title-text">Step into the word of business with confidence & expertise by enrolling in a dynamic business courses designed for individuals at all stages of your career.</p>
            <p className="pb-6 title-text">Our programs provide the knowledge, skills & insights necessary to thrive in todays competitive world</p>
            <Link href={`/${Schools[3]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      {/* school of ICT */}
      <div className="flex mb-8 p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of ICT & Computer ​packages</div>
        <div className="w-full flex justify-center scaler xxsm:!scale-75 mlg:!scale-100  items-center h-72 slg:w-1/2">
          <div style={{transform: 'translate(197px, -130px)'}} className="p-3 title-color h-32 w-32 text-3xl text-white"></div>
          <Image alt="school of ICT" className="absolute border-4 border-white m-1 z-10" width={400} height={400} src={'/ea111b13ddd50698f161e6d24a14140e.jpg'}/>
          <div style={{transform: 'translate(-137px, 135px)'}} className="p-3 title-color h-32 w-48 text-3xl text-white "></div>
        </div>
        <div className="slg:w-1/2 font-medium font-sans h-auto slg:h-96 w-full flex  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of ICT & Computer ​packages</div>
            <p className="pb-6 title-text">In todays rapidly evolving digital landscape, profecincy in information technology and computer packages is not just a skill but a necesity.</p>
            <Link href={`/${Schools[4]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      {/* school of  Front Office & Administration*/}
      <div className="flex mb-8 p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center relative items-center gap-4 w-full">
        <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Front Office & Administration</div>
        <div className="slg:w-1/2 font-medium font-sans h-auto slg:h-96 w-full hidden slg:flex  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Front Office & Administration</div>
            <p className="pb-6 title-text">Graduates in our programs are well prepared for a variety of roles in front office operations & customer service among others no matter the industry and sector.</p>
            <Link href={`/${Schools[5]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
        <div className="w-full flex justify-center scaler xxsm:!scale-75 mlg:!scale-100  items-center h-72 slg:w-1/2">
          <div style={{transform: 'translate(197px, -130px)'}} className="p-3 title-color h-32 w-32 text-3xl text-white"></div>
          <Image alt="school of ICT" className="absolute border-4 border-white m-1 z-10" width={400} height={400} src={'/6f4175f2499f20423e439f7fe12f5600.png'}/>
          <div style={{transform: 'translate(-137px, 135px)'}} className="p-3 title-color h-32 w-48 text-3xl text-white "></div>
        </div>
        <div className="slg:w-1/2 font-medium font-sans h-auto slg:h-96 w-full flex slg:hidden  items-center ">
          <div className="pt-4 justify-center flex flex-col  h-full px-6">
            <div className="title-color slg:block hidden mt-6 mb-6 text-3xl  pt-1 pb-2 text-center text-white">School of Front Office & Administration</div>
            <p className="pb-6 title-text">Graduates in our programs are well prepared for a variety of roles in front office operations & customer service among others no matter the industry and sector.</p>
            <Link href={`/${Schools[5]}`}><div className="title-gradien mt-6 text-xl w-32 pt-0.5 pb-2 text-center text-white ">Learn More</div></Link>
          </div>
        </div>
      </div>
      <div className="text-4xl z-10 flex flex-col items-center rounded-full text-green-600 fixed bottom bottom-8 pt-2 px-4 pb-4 bg-gray-100 right-8">
        <Link href={'https://wa.me/254202319877'}><RiWhatsappFill/></Link> 
        <span className="text-sm title-text">Talk to us</span>
      </div>
      <Extenddivs/>
      {/* Footer */}
      <div  id="contacts"></div>
      <Footer/>
    </div>
  );
}
