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
      <Headers 
        title="SHIGLAM KENYA ,Get Exclusive offers on Latest trends in  Women's Earrings, Waist beads, Rings, Makeup products, Anclets — Ancle Bracelets and more on jewelry in NAIROBI & its enirons."
        desc="SHIGLAM offers Exclusive discounts and the latest trends at SHIGLAM KENYA — NAIROBI — Women's Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more. ✓ Free Shipping On Orders ..." 
        socialtitle="SHIGLAM KENYA ,Get Exclusive offers on Latest trends in Fashon & Jewelry | Women's Earrings, Waist beads, Rings, Makeup products, Anclets — Ancle Bracelets and more on jewelty in NAIROBI & its enirons." 
        socialdesc="Get Exclusive discounts on the latest trends in Women's Jewelry — Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more Jewelries at SHIGLAM KENYA — NAIROBI — ✓ Free Shipping On Orders ... "
        socialimages="https://res.cloudinary.com/dddx5qpji/image/upload/v1674473371/offerbanner1_3_yo5p97.jpg"
      />
      <div className='flex gap-3 p-4'>
        <div onClick={() => setHomeTab("Trending")} className={' font-medium text-center flex-grow text-base rounded-full px-8 pt-3 pb-3.5 '.concat(hometab == "Trending" ? 'bg-grayb text-white' : 'bg-grayw text-black')}>
          Trending
        </div>
        <div onClick={() => setHomeTab("Apparel")} className={' font-medium text-center flex-grow text-base rounded-full px-8 pt-3 pb-3.5 '.concat(hometab == "Apparel" ? 'bg-grayb text-white' : 'bg-grayw text-black')}>
          Shops
        </div>
      </div>
      <div className={hometab == "Trending" ? "columns-2 w-fitdiv gap-2 pb-4 sm:columns-3 sm:max-w-3xl md:columns-4 md:max-w-5xl xlg:grid-cols-5 xlg:max-w-7xl" : "hidden"}>
        {products.map((product) => (
          <div key={product._id} className='px-1 py-1'>
            <PinsProds
              key={product}
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
                  <div className='flex  flex flex-col xxsm:flex-row bg-white-parent rounded-full px-6 py-2 md:px-16 gap-2 items-center'>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
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
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, { reviews: 0, color: 0, distinctCateg: 0, gallery: 0, favourites: 0, carts: 0, views: 0, pageViews: 0, ordered: 0, description: 0 }).lean().limit(24);
  const shop = await Shop.find({}, { user: 0, orderedItems: 0, message: 0, sales: 0 }).lean();
  await db.disconnect();
  
  return {
    props: {
      products: products.map(db.convertDocToObj),
      shop: shop.map(db.convertDocToObj),
    },
  };
}
export default Home
