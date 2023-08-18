import React, { useState, useEffect } from 'react';
import Mycategs from './Categories';
import Link from 'next/link';
import axios from 'axios';
import Loader from './Loader';
import Layout from './Layout';
import { useStateContext } from '../utils/StateContext';
import { HiArrowNarrowLeft } from 'react-icons/hi';

function CategoriesPage( ) {

  const { setRoute, openCategory, SetOpenCategory } = useStateContext();
  const handleLinks = async () => {
    SetOpenCategory(false);
    setRoute("home")
  }
  const [banner, setBanners] = useState(null);
  const fetchBanners = async () =>{
    try {
      const { data } = await axios.get('/api/categories');
      setBanners(data);
    } catch(err) {
      //console.log(err)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  return (
    <div style={{zIndex: 110}} className={'fixed left-0 h-fit h-screen overflow-y-scroll overflow-x-hidden top-0 w-screen bg-white '.concat(openCategory ? '' : 'hidden')}>
      <Layout>
        <div className='fixed bg-white rounded-full w-11 h-11 flex justify-center items-center z-10 left-3 p-3 text-6xl top-40' onClick={handleLinks}><HiArrowNarrowLeft /></div>
        <div className='flex pb-20 justify-center'>
          {banner ? 
            <div className='columns-1 grow sm:columns-2 sm:max-w-xl md:columns-3 md:max-w-4xl lg:columns-4 lg:max-w-7xl'>
              {banner.map((categ, index) => (
                <Link key={index} href={`/${categ.midText.replace(" ", "-")}`} legacyBehavior>
                  <div onClick={handleLinks} className='px-1 py-1'>
                    <Mycategs
                      categ={categ}
                    />
                  </div>
                </Link>
                ))}
            </div> :
            <div className='flex h-fitdiv justify-center items-center'>
              <Loader/>
            </div>
          }
        </div>
      </Layout>
    </div>
  );
}

export default CategoriesPage