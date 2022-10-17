import bcrypt from 'bcryptjs';
 
const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ], 
  products: [
    { 
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: ['/images/shirt1.jpg', '/images/shirt2.jpg', '/images/shirt3.jpg',],
      gallery: ['/images/pants3.jpg','/images/shirt1.jpg'],
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      gallery: ['/images/pants3.jpg','/images/shirt1.jpg'],
      isFeatured: true,
      featuredImage: '/images/banner2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 4.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      
    },
    {
      name: 'Slim Shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      gallery: ['/images/pants3.jpg','/images/shirt1.jpg'],
      price: 90,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      
    },
    {
      name: 'Golf Pants',
      slug: 'golf-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      gallery: ['/images/pants3.jpg','/images/shirt1.jpg'],      
      price: 90,
      brand: 'Oliver',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Smart looking pants',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      
    },
    {
      name: 'Fit Pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      gallery: ['/images/pants3.jpg','/images/shirt1.jpg'],
      price: 95,
      brand: 'Zara',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular pants',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      
    },
    {
      name: 'Class ic Pants',
      slug: 'classic-pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      gallery: ['/images/pants3.jpg','/images/shirt1.jpg'],
      price: 75,
      brand: 'Casely',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular pants',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      
    },
  ],
  banner: [
      {
        smallText:['CUSTOM AIRFORCE🔥', 'SHIRT DRESS🔥', 'SLING BAG🔥', 'AIR JORDAN 4🔥', 'OUTFIT🔥', 'AIRFORCE 1🔥'],
        midText:'September SALE',
        largeText1:'September SALE',
        image:['/images/shoes/shoe13-removebg-preview.png', '/images/glam/trendy3.jfif', '/images/bags/bag9.jfif', '/images/shoes/shoe3-removebg-preview.png', '/images/glam/trendyy2.jfif', '/images/shoes/shoe7-removebg-preview.png'],
        buttonText:'SHOP NOW',
        discount:['/images/banners/discountbg3-removebg-preview.png', '/images/banners/discountbg1-removebg-preview.png', '/images/banners/discountbg2-removebg-preview.png', '/images/banners/discountbg-removebg-preview.png'],
        desc:'Best price In The Market',
      },
  ],
  categorythumbnail: [
      {
        name: 'shoes',
        image: ['/images/glam/trendy3.jfif'],
      },
  ],
  yourPhoto: [
      {
        style: 'elegant',
        image: ['/images/glam/trendy3.jfif'],
      },
  ],
};

export default data;