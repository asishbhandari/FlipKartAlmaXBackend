# Flipkart App API Endpoint Project #

Welcome to the backend repository of Flipkart App! This is a simple api application offering various endpoints to handle tasks efficiently. Leveraging NodeJs with ExpressJs, it provides a scalable and easy-to-use framework for building RESTful APIs. The application's provides different endpoints regarding user, products, categories, cart and Wishlist. In addition, it gracefully handles undefined routes by responding with a 404 status code and an appropriate error message.

## Features ##
`RESTful APIs:` Provides a set of RESTful APIs to serve data to the frontend client.  
`User Authentication:` Supports user authentication and authorization using JSON Web Tokens (JWT).  
`Data Fetching:` Retrieves and serves Flipkart content data including products, users, categories, cart and more from the database.  
`Database Integration:` Integrates with a database (e.g., MongoDB) to store and retrieve data.  
`Middleware:` Utilizes middleware functions for request processing, error handling, and more.  

## Technologies Used ##
`Express.js:` Fast, unopinionated, minimalist web framework for Node.js.  
`MongoDB:` NoSQL database used for storing application data.  
`Mongoose:` Elegant MongoDB object modeling for Node.js.  
`JSON Web Tokens (JWT):` JSON-based open standard for creating access tokens.  
`bcrypt:` Library for hashing passwords securely.  
`dotenv:` Zero-dependency module that loads environment variables from a .env file.  

## Endpoints ##

BaseUrl `https://flipkartalmaxbackend.onrender.com`


## User Routes ##

### User SignUp Request ###
POST `/api/user/register`  
stores user signup details in the database if it does not exits

### User Login Request ###
POST `/api/user/login`  
validates and grants an access token to user for further request

### Logout User ###
GET `/api/user/logout`  
Logout user 

### update user information ###
PATCH `/api/user/:userId`  
update database with the users latest information

### Delete User ###
GET `/api/user/:userId`  
Removes the user from database including its cart and wishlist.


## Category Routes ##

### Get all the available categories ###
GET `/api/category/details`  
get user all avalable categories in database

### Create Category ###
POST `/api/category/create`  
Creates the category if it is not already added

### Get Single Category ###
GET `/api/category/:categoryId`
Provide id of the category to get its details

### Update Category ###
Patch `/api/category/:categoryId`
Provide Id of the category in params to update it

### Remove Category ###
Delete `/api/category/:categoryId`
This route deletes the category from database


## Product Routes ##

### Get all the available products ###
GET `/api/product/details`  
Route to get / search all the products it can include bloew querry params also.
This route can include Querry params like search, limit, page, category, price, isAssured, rating, sort. 
To inculde search querry, or filter querry (category, price, isAssured, rating) or sort querry
Also you can asked for for page no and can limit the no of products in a page.

### Add product to database ###
POST `/api/product/addProduct`  
Creates the product if it is not already in database by same seller

### Get Single product ###
GET `/api/product/:productId`
This route is used get details of a single product by passing its id in params

### Update product ###
Patch `/api/product/:productId`
This route is used to update the details of the product by specific seller

### Remove product ###
Delete `/api/product/:productId`
This route is used to delete the product by specific seller from database

## Cart Routes ##

### Get all the available carts ###
GET `/api/cart/details`  
This route is used to get all the users cart available

### Get user cart ###
GET `/api/cart/:cartId`
This route is used to get the own user cart

### Add product to uesr cart ###
Patch `/api/cart/:cartId`
Route to add the products to user(Buyer) cart

### Remove product from user cart ###
Patch `/api/cart/:cartId`
Route to remove the products from user(Buyer) cart

## Wishlist Routes ##

### Get all the available carts ###
GET `/api/wishlist/details`  
This route is used to get all the users wishlist available

### Get user cart ###
GET `/api/wishlist/:wishlistId`
This route is used to get the own user wishlist

### Add product to uesr cart ###
Patch `/api/wishlist/:wishlistId`
Route to add the products to user(Buyer) wishlist

### Remove product from user cart ###
Patch `/api/wishlist/:wishlistId`
Route to remove the products from user(Buyer) wishlist

### Contributing ###
We welcome contributions from the community! If you find any bugs, have feature requests, or want to contribute enhancements, please feel free to submit a pull request or open an issue in this repository.

Before contributing, please make sure to review our Contributing Guidelines for instructions on how to contribute to this project.
