import React, { useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import useStyles from '../../utils/styles';
import ProductItem from '../ProductItem';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import axios from 'axios';
import Loader from '../Loader';

export default function Earrings() {
   const classes = useStyles();
   const { state, dispatch } = useContext(Store);
   const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 1 }) =>
      await fetch(
        `http://www.shiglam.com/api/products/piercings?page=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < pages[0].maxPage) {
          return pages.length + 1;
        } else {
        	return undefined
        }
      },
    }
  );

   console.log(data);
	return (
		<div>
		  {status === "success" && (
            <InfiniteScroll
              dataLength={data?.pages.length * 16}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Loader/>}
            >
              <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
                {data?.pages.map((page) => (
                  <>
                    {page.piercings?.map((product) => (
                      <ProductItem
                        product={product}
                        key={product.slug}
                      ></ProductItem>
                    ))}
                  </> 
                ))}
              </div>
            </InfiniteScroll>
          )}
		</div>
	)
}

