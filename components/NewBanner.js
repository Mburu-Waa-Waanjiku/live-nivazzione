import React from 'react';
import useStyles from '../utils/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';

function NewBanner({newdrops}) {
    const classes = useStyles();
	return (
		<div className="bannermarquee" style={{position: 'absolute', top: '15%', float: 'right', width: '50vw' }}>
               <div className={classes.fullWidth}>
                 <Swiper                    
                    breakpoints={{
                      100: {
                         slidesPerView: 3.3,
                       },
                      640: {
                         slidesPerView: 3.3,
                      }, 
                      1000: {
                         slidesPerView: 3.3,
                      },             
                    }}
                      
                      autoplay={{
                          delay: 1000,
                          disableOnInteraction: false,
                        }}
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={true}
                      navigation= {true}
                      centeredSlides={false}
                
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {newdrops.slice(-10).map((product) =>(
                      <SwiperSlide key={product}>
                        <div className={classes.newpostb} style={{height: 9}}>
                          NEW
                        </div>
                           <Image
                             width={364}
                             height={484}
                             src={product.image[0]}
                             alt={product.name}
       
                             className="shadow object-cover h-auto w-100 bg-gray-100"
                           />
                       </SwiperSlide>
                     ))
                   }
                 </Swiper>
               </div>
		</div>
	)
}

export default NewBanner