import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import useStyles from '../utils/styles';
import ProductItem from '../components/ProductItem';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { Pagination } from '@material-ui/lab';
import Tabsbottom from '../components/Tabsbottom';
import FilterListIcon from '@mui/icons-material/FilterListRounded';
import { Store } from '../utils/Store';
import layoutStyles from '../styles/Layout.module.css'

const PAGE_SIZE = 20;

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
   const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
  } = router.query;
  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };
  const [clicked, setclicked] = useState(false);
  const SetClick = () => {
    setclicked(current => !current);
  }
  
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <>
    <Layout title="Search">
      <Grid className={layoutStyles.mt1} container spacing={1}>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid className={clicked ? classes.sfScreen: classes.sScreen} item onClick={SetClick} >
              <FilterListIcon/> Filter <div className={clicked ? classes.ftrStatusx :classes.ndicatenone}>×</div>
              <Grid item md={3} className={clicked ? classes.ndicatetrue : classes.ndicatenone} >
                <List>
                  <ListItem>
                    <Box className={layoutStyles.fullWidth}>
                      <Typography>Categories</Typography>
                        <Select fullWidth value={category} onChange={categoryHandler}>
                          <MenuItem value="all">All</MenuItem>
                          {categories &&
                            categories.map((category) => (
                              <MenuItem key={category} value={category}>
                                {category}
                              </MenuItem>
                          ))}
                       </Select>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className={layoutStyles.fullWidth}>
                      <Typography>Brands</Typography>
                        <Select value={brand} onChange={brandHandler} fullWidth>
                          <MenuItem value="all">All</MenuItem>
                            {brands &&
                              brands.map((brand) => (
                                <MenuItem key={brand} value={brand}>
                                  {brand}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className={layoutStyles.fullWidth}>
                      <Typography>Prices</Typography>
                        <Select value={price} onChange={priceHandler} fullWidth>
                          <MenuItem value="all">All</MenuItem>
                            {prices.map((price) => (
                              <MenuItem key={price.value} value={price.value}>
                                {price.name}
                              </MenuItem>
                            ))}
                        </Select>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className={layoutStyles.fullWidth}>
                      <Typography>Ratings</Typography>
                      <Select value={rating} onChange={ratingHandler} fullWidth>
                        <MenuItem value="all">All</MenuItem>
                        {ratings.map((rating) => (
                          <MenuItem dispaly="flex" key={rating} value={rating}>
                          <Rating value={rating} readOnly />
                            <Typography component="span">&amp; Up</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Grid item className={classes.sScreen}>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Customer Reviews</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </Grid>
            <Grid item className={classes.sScreen}>
              {products.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {brand !== 'all' && ' : ' + brand}
              {price !== 'all' && ' : Price ' + price}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
          </Grid>
          <div className="grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </div>
          <Pagination
            className={layoutStyles.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>

    <Tabsbottom/>
    </Layout>
    </>
   
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}

