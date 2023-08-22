import React from 'react'; 
import db from '../utils/db'; 
import Product from '../models/Product';
import Shop from '../models/Shop';
import Tabsbottom from '../components/Tabsbottom';
import Headers from '../components/HeadersContainer';
import PinsProds from '../components/PinsProds'
import { useStateContext } from '../utils/StateContext';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

const Home = ({ products, shop }) => {
  const { hometab, setHomeTab } = useStateContext();

  return (
    <Layout>
      <div className='flex  p-4'>
        <div onClick={() => setHomeTab("Trending")} className={' font-medium text-center flex-grow text-base rounded-full px-8 pt-3 pb-3.5 '.concat(hometab == "Trending" ? 'bg-grayb text-white' : 'bg-grayw text-black')}>
          Trending
        </div>
        <div onClick={() => setHomeTab("Apparel")} className={'ml-3 font-medium text-center flex-grow text-base rounded-full px-8 pt-3 pb-3.5 '.concat(hometab == "Apparel" ? 'bg-grayb text-white' : 'bg-grayw text-black')}>
          Shops
        </div>
      </div>
      <div className={hometab == "Trending" ? "columns-2 w-fitdiv gap-2 pb-4 sm:columns-3 sm:max-w-3xl md:columns-4 md:max-w-5xl xlg:grid-cols-5 xlg:max-w-7xl" : "hidden"}>
        {products.map((product) => (
          <div key={product._id} className='px-1 py-1'>
            <PinsProds
              key={product}
              shop={shop}
              product={product}
            />
          </div>
          ))}
      </div>
      <div className='flex justify-center'>
        <div className={hometab == "Apparel" ? "grid w-fitdiv grid-cols-2 gap-2 pb-4 md:grid-cols-3 md:max-w-7xl" : "hidden"}>
          {shop.map((shop, index) => (
            <Link key={index} href={`/shop/${shop._id}`}>
              <div className='w-full pulse relative h-40 sm:h-48 overflow-hidden  rounded-3xl  '>
                <div className='w-full h-full flex justify-center items-center'>
                  <Image 
                    className='w-full object-cover h-auto min-w-full'
                    layout='fill'
                    alt={shop.shopName} 
                    src={shop.coverPhoto}
                  />
                </div>
                <div className='absolute px-2 py-4 flex justify-end items-center xxsm:items-start xsm:justify-center xsm:items-center h-fitdiv flex-col z-10 bottom-0 w-fitdiv categshade-full'>
                  <div className='flex  flex flex-col xxsm:flex-row bg-white-parent rounded-full px-6 py-2 md:px-16  items-center'>
                    <div className='w-14 h-14 mr-2 rounded-full overflow-hidden'>
                      <Image className='rounded-full object-contain' width={100} height={100} alt="" src={shop.logo} />
                    </div>
                    <div className='text-lg sm:text-2xl whitespace-nowrap xxsm:whitespace-normal font-medium title-font text-white'> {shop.shopName} </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
          }
        </div>
      </div>
      <Tabsbottom/>
    </Layout> 
)
 
};

export default Home

export async function getStaticProps() {
  await db.connect();
  const products = await Product.find({ isEditorsChoice: true }, {name:1, slug:1, category:1, image:1, gallery:1, isEditorsChoice: 1, isOnoffer: 1, shopId: 1 }).lean().sort({ createdAt: -1 });
  const shop = await Shop.find({}, { shopName: 1, logo:1, coverPhoto: 1 }).lean();
  await db.disconnect();
  
  return {
    props: {
      products: products.map(db.convertDocToObj),
      shop: shop.map(db.convertDocToObj),
    },
  };
}
