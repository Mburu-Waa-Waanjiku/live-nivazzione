import React, { useState, useEffect } from 'react';
import Headers from './HeadersContainer';
import Mycategs from './Categories';
import Link from 'next/link';
import axios from 'axios';
import Loader from './Loader';
import Layout from './Layout';

function CategoriesPage({ openCategory }) {
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
        <Headers 
          title="SHIGLAM CATEGORIES"
          desc="Browse all Shopping categories made just for you in SHIGLAM KENYA — NAIROBI — ✓ Free Shipping On Orders ..." 
          socialtitle="SHIGLAM CATEGORIES" 
          socialdesc="Browse all Shopping categories made just for you in SHIGLAM KENYA — NAIROBI — ✓ Free Shipping On Orders ... "
          socialimages="https://res.cloudinary.com/dddx5qpji/image/upload/v1674473371/offerbanner1_3_yo5p97.jpg"
        />
        <div className='flex pb-20 justify-center'>
          {banner ? 
            <div className='columns-1 sm:columns-2 sm:max-w-xl md:columns-3 md:max-w-4xl lg:columns-4 lg:max-w-7xl'>
              {banner.map((categ, index) => (
                <Link key={index} href={`/${categ.midText.replace(" ", "-")}`} legacyBehavior>
                  <div  className='px-1 py-1'>
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