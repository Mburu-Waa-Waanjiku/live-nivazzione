import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductNocart from './ProductNocart'; 
import { useStateContext } from '../utils/StateContext';
import {FiSearch} from 'react-icons/fi';
import useStyles from '../utils/styles';
import { InputBase, IconButton } from '@material-ui/core';

function SearchComponent() {
  const { setDivstick } = useStateContext();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const fetchProducts = async () => {
    try {
      const { data } = await axios.post(`/api/products/categories`, {});
      setProducts(data);
    } catch (err) {
            console.log(err);   
          }
  };
  
  const [filteredData, setFilteredData] = useState({
    products: [],
    isSearch: false,
    resultFound: false,
  });
  
  const debounce = (func, wait) => {
    let timerId;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };
  
  
  const filterData = () => {
    let fData = [];
    let resultFound = false;
    setDivstick(false);
    if(products.length > 0) {
      if (search) {
        fData = [...products.filter((product) => product.description.toLowerCase().indexOf(search.toLowerCase()) != -1)];
        if (fData.length > 0) {
          resultFound = true;
          setDivstick(true);
        } 
      }
      setFilteredData({
        ...fData,
        products: [...fData],
        isSearch: search.trim().length > 0,
        resultFound: resultFound,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    filterData();
  }, [search]);
  
  return (
	  <div className='relative max-h-screen'>
      <div className={classes.reviewTopTab}>
        <div className="flex justify-center">
          <div className={classes.smseach} style={{marginLeft: "1rem", marginRight: "1rem", top: '50px', padding: "25px 4px", backgroundColor: "transparent", display: "flex", justifyContent: "center"}}>
            <div className='flex items-center bg-grayw xsm:bg-graymw ' style={{ oveflow: "hidden", borderRadius: 50, width: "100%"}}>
              <IconButton
                aria-label="search"
                className='p-btn'
                >
                  <FiSearch />
                </IconButton>                
              <InputBase
                style={{width: "80%"}}
                placeholder="Search products..."
                onChange={(e) => debounce((v) => {
                  setSearch(v);
                  }, 10)(e.target.value)}
              /> 
            </div>  
          </div>
        </div>
      </div>
      <div className={"flex bg-white z-50 place-content-center relative rounded-2xl slg:absolute w-full overflow-y-scroll".concat(filteredData.resultFound && " absolute bshadow h-search overglow-y-scroll")}>
        {filteredData.isSearch && !filteredData.resultFound && (
          <p className='m-5'>No results found..</p>
        )}
        {filteredData.resultFound &&
          <div className='bg-whiteblock h-full w-full px-4 mb-72 pt-6 z-50'>
            {filteredData.products.map((product) => {
              return (
                <ProductNocart
                  product={product}
                  key={product.slug}
                />
              );
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default SearchComponent