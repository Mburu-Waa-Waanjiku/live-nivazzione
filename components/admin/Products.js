import React, { useState, useEffect } from 'react';
import Pendingps from './AdminPendingPs';
import AdminProds from './AdminProduct';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { 
  IconButton,
  InputBase,
} from '@material-ui/core';

function Products({ fetchProducts, fetchPendingPs, pendingProducts, showSearch, setSearch, setShowSearch, filteredData, debounce, filterData, setProducts, setFetchProgres, setShow, admin, Navigation, FreeMode, Thumbs, Pagination, Autoplay, Swiper, SwiperSlide, classes, products, Tabs, Tab, TabPanel, TabContext, current}) {
  
  const producttabs = [ 'All Products', 'Pending products', 'Out of Stock', 'Less Than Five', 'Best Selling', 'Least Selling', 'Most Loved', 'On Offer', 'Editors Pics'];
  const [currenttab,  setTab] = useState('All Products');
  const setCurrentTab = ( event, newPage ) => {
  	setTab(newPage)
  }
 
  useEffect(() => {
    filterData();
  }, []);

  const OutofStock = [...products.filter((product) => product.countInStock < 1)];
  const LessthanFive = [...products.filter((product) => product.countInStock < 5 && product.countInStock > 0)];
  const bestSelling = [...products.filter((product) => product.initialStock - product.countInStock > 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];
  const leastSelling = [...products.filter((product) => product.initialStock - product.countInStock < 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? -1 : 1)];
  const mostLoved = [...products.filter((product) => product.favourites.length > 0).sort((a, b) => b.favourites.length - a.favourites.length )];
  const offers = [...products.filter((product) => product.isOnoffer)];
  const editorspics = [...products.filter((product) => product.isEditorsChoice).sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))];
  
  return (
	  <div className={current == "Products" ? "bannerwidth pt-1" : "hidden pt1"}>
      <TabContext value={currenttab}>
        <div className={admin.tabsfloat + " " + "grid justify-center"}>
          <Tabs onChange={setCurrentTab} variant="scrollable" scrollButtons="auto"  value={currenttab} classes={{ indicator:classes.ndicatenone}} sx={{"& .MuiTab-root.Mui-selected": {color:"white", backgroundColor:"#222"},"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} >
            {producttabs.map((tab)=>(
              <Tab 
                value={tab}
                key={tab} 
                label={tab == 'Out of Stock' ? tab + " " + OutofStock.length 
                       : tab == 'Less Than Five' ? tab + " " +  LessthanFive.length 
                       : tab == 'On Offer' ? tab + " " +  offers.length : tab } 
                classes={{ root: classes.roundedTab }} 
                style={{ fontWeight: 'bold', maxWidth:360, border: '2px solid #222', transform: 'translateX(4px)', margin:3}}/>
              ))
            }
          </Tabs>
        </div>
        <div>
          {!showSearch ? <div onClick={() => {setShowSearch(true)}} className={admin.searchbtn} style={{backgroundColor: "white", position: "fixed", boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)", padding: 10 , zIndex: 40, left: 0, height: 'fit-content' }}> <SearchIcon sx={{fontSize:10}} /></div> :
            <div className={classes.smseachbg + " " + admin.searchheight} 
              style={{ position: "fixed", zIndex: 40, left: showSearch ? '0' : '120vw', background: 'white',  width: "100vw"}}
             >
              <div className={classes.reviewTopTab}>
                <ArrowBackIosIcon onClick={() => {setShowSearch(false)}} sx={{fontSize:10, float:"left", marginTop: 1.5}} />
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
                  {filteredData.products.map((product, index) => {
                    return (
                      <AdminProds
                        key={index}
                        product={product}
                        Navigation={Navigation}
                        FreeMode={FreeMode}
                        Thumbs={Thumbs}
                        Pagination={Pagination}
                        Autoplay={Autoplay}
                        Swiper={Swiper}
                        admin={admin}
                        SwiperSlide={SwiperSlide}
                        setFetchProgres={setFetchProgres}
                        setShow={setShow}
                        setProducts={setProducts}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          }
        </div>
        <TabPanel value='All Products' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {products.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Pending products' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {pendingProducts.map((product) =>(
              <Pendingps
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                fetchProducts={fetchProducts}
                fetchPendingPs={fetchPendingPs}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Out of Stock' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {OutofStock.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Less Than Five' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {LessthanFive.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Best Selling' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {bestSelling.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Least Selling' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {leastSelling.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Most Loved' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {mostLoved.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='On Offer' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {offers.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
        <TabPanel value='Editors Pics' style={{ backgroundColor: 'rgba(209, 214, 224, 0.4)', padding: 16, width: '100%'}}>
          <div className={admin.productsgridding}>
           {editorspics.map((product) =>(
              <AdminProds
                key={product}
                product={product}
                Navigation={Navigation}
                FreeMode={FreeMode}
                Thumbs={Thumbs}
                Pagination={Pagination}
                Autoplay={Autoplay}
                Swiper={Swiper}
                admin={admin}
                SwiperSlide={SwiperSlide}
                setFetchProgres={setFetchProgres}
                setShow={setShow}
                setProducts={setProducts}
             />
             ))
            }
          </div>
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default Products