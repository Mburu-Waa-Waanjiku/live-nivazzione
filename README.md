Nextjs Tailwind ECommerce Website Like Amazon
next amazona

Build ECommerce Website Like Amazon by Next.js

Source Code    :  https://github.com/basir/next-amazona
Demo Website :  https://nextjs-amazona-final.vercel.app
What you will learn
NextJS basics like setting up project, navigating between pages and data fetching
NextJS advanced topics like dynamic routing, image optimization,  SSG and SSR
Tailwind CSS framework to build responsive website using custom theme, animation and carousel
ReactJS including decomposing components, context API and hooks
Next Auth package to authenticate customers and admin users
MongoDB and Mongoose to save and retrieve data like products, orders and users
PayPal developer api to make online payment
Deploy web applications on servers like Vercel and Netlify
Full Course
Learn building this ecommerce website on Udemy with 90% discount: https://www.udemy.com/course/nextjs-ecommerce

Run it Locally
$ git clone https://github.com/basir/next-tailwind-amazona
$ cd next-tailwind-amazona
$ npm install
$ npm run dev
$ Open http://localhost:3000/api/seed
$ Open http://localhost:3000
Lessons
Introduction
Install Tools
Create Next App
Publish to Github
Create Website Layout
create layout component
add header
add main section
add footer
add tailwind classes
List Products
add data.js
add images
render products
Create Product Details
create product page
create 3 columns
show image in first column
show product info in second column
show add to cart action on third column
add styles
Handle Add To Cart
define react context
define cart items state
create addd to cart action
add reducer
create store provider
handle add to cart button
Create Cart Page
create cart.js
use context to get cart items
list items in cart items
redirect to cart screen after add to cart
Update Quantity In The Cart
add select box for quantity
handle select box change
Save Cart Items
install js-cookie package
save and retreive cart items in cookies
Create Login Form
install react hook form
create input boxes
add login button
Connect To MongoDB
install mongoose
install mongodb or use mongodb atlas
save connection url in .env file
create db utils file
create sample users
Create Login API
install next-auth
create nextauth.js
implement signin
use signin in login form
Add User Menu
check user authentication
install headlessui
show user menu
Create Shipping Screen
display address fields
save address in context
Create Payment Method Screen
dispaly payment methods
save payment method in context
Seed sample products
create product model in mongoose
insert sample products to mongodb
Load Products MongoDB
load products in home page from mongodb
load products in product page from mongodb
use product api to check count in stock in add to cart
Create Place Order Screen
display shipping address
display payment method
display order items
implment create order
Create Order Screen
implement backend api for order details
load order data from backend
display order details
Create Register Screen
add signup api
create register page
call api on form submit
Pay Order By PayPal
add paypal button
handle payment
create backend api
update order state
Create Order History Screen
create my order api
create order history component
fetch orders and display them
Publish On Vercel
create vercel account
connect to github
set next auth and mongodb db in env vars
push code to github
Update User Profile
create profile screen
show user info
handle update user info
Create Admin Dashboard
Create Admin Menu
create dashboard screen
Implement admin summary api
List Orders For Admin
create orders page
create orders api
use api in page
Deliver Order For Admin
create deliver api
add deliver button
implement click handler
List Products For Admin
create products page
create products api
use api in page
Create Product Edit Page
create edit page
create api for product
show product data in form
Upload Product Image
create cloudinary account
get cloudinary keys
create upload api
upload files in edit page
Create And Delete Products
add create product button
build new product api
add handler for delete
implement delete api
List Users For Admin
create users page
create users api
use api in page