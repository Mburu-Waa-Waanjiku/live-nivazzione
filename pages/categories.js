import React from 'react';
import Mycategs from '../components/Categories';
import Link from 'next/link';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import db from '../utils/db'; 
import Banner from '../models/Banner';
import Tabsbottom from '../components/Tabsbottom';

function Categories({banner}) {

  return (
    <Layout>
      <div className='flex pb-20 justify-center'>
        {banner ? 
          <div className='columns-1 grow sm:columns-2 sm:max-w-xl md:columns-3 md:max-w-4xl lg:columns-4 lg:max-w-7xl'>
            {banner.map((categ, index) => (
              <Link key={index} href={`/${categ.midText.replace(" ", "-")}`} legacyBehavior>
                <div className='px-1 flex justify-center py-1'>
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
      <Tabsbottom/>
    </Layout>
  );
}

export default Categories

export async function getStaticProps() {
    await db.connect();
    const banner = await Banner.find({ largeText1: "category"}).lean();
    await db.disconnect();
    
    return {
      props: {
        banner: banner.map(db.convertDocToObj),
      },
    };
  }
  
