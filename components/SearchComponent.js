import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import ProductNocart from './ProductNocart'; 
import { useStateContext } from '../utils/StateContext';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { InputBase, IconButton } from '@material-ui/core';

function SearchComponent() {

  const { searchClick, handleClickSearchf } = useStateContext();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products`);
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
    if (search) {
      fData = [...products.filter((product) => product.description.toLowerCase().indexOf(search.toLowerCase()) != -1)];
      if (fData.length > 0) {
        resultFound = true;
      }
    }
    setFilteredData({
      ...fData,
      products: [...fData],
      isSearch: search.trim().length > 0,
      resultFound: resultFound,
    });
  };

  useEffect(() => {
    fetchProducts();
    filterData();
  }, [search]);
  
  return (
	<div className={classes.smseachbg} 
       style={{ position: "fixed", zIndex: 1400, top: 0, left: searchClick ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
      >
      <div className={classes.reviewTopTab}>
        <ArrowBackIosIcon onClick={handleClickSearchf} sx={{fontSize:10, float:"left", marginTop: 1.5}} />
        <div className="flex justify-center">
          <div className={classes.smseach} style={{marginLeft: "1rem", marginRight: "1rem", top: '50px', padding: "25px 4px", maxWidth: "650px", backgroundColor: "transparent", display: "flex", justifyContent: "center"}}>
            <div style={{boxShadow: "0 2px 5px 1px rgb(64 60 67 / 20%)" ,backgroundColor: "rgba(255, 255, 255, 0.7)", oveflow: "hidden", borderRadius: 50, width: "100%"}}>
              <IconButton
                type="submit"
                sx={{"&.MuiIconButton-root": {padding:0},}}
                 aria-label="search"
                >
                 <SearchIcon />
               </IconButton>                
              <InputBase
                style={{width: "70%"}}
                placeholder="Find products..."
                onChange={(e) => debounce((v) => {
                  setSearch(v);
                  }, 10)(e.target.value)}
              /> 
            </div>  
          </div>
        </div>
      </div>
      <div className="flex place-content-center w-full h-full">
        <div style={{overflowX: 'auto',height: '76%', margin: 20, display: "grid", gridTemplateColumns: 'repeat(3, minmax(0px, 300px))', gap: 10, gridAutoRows: '1fr' }}>
          {filteredData.isSearch && !filteredData.resultFound && (
            <p>No results found..</p>
          )}
          {filteredData.products.map((product) => {
            return (
              <ProductNocart
                product={product}
                key={product.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchComponent