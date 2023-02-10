import Link from 'next/link';
import React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';

function Card({instaProducts}) {
  return (
    <Box  sx={{ width: 500, height: 'fit-content',borderRadius: 3, padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.9)'  }}>
      <div className="flex justify-center mt-5 mb-8">
        <Image src="/Instagram-Icon.png" width={50} height={50} alt="instagram icon"
        />
        <div className="flex ml-5 text-2xl self-center"> Instagram Posts </div>
      </div>
      <ImageList variant="masonry" className="columns-2 md:columns-3" gap={8}>
        {instaProducts.map((product) => (
          <ImageListItem key={product.id}>
            <Link href={product.instaLink}>
              <img
                src={`${product.image}?w=248&fit=crop&auto=format`}
                srcSet={`${product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={product.instaLink}
                loading="lazy"
                style={{borderRadius: 20}}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default Card