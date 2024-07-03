## collections

User

- userId: objectId
- name: string
- passwordHash: string
- email: string, unique
- profilePicture: string [cloudinary]
- contact: number
- address: string
- role: ['buyer', 'seller']
- cartId: cart ref
- wishListId: wishlist ref

Product

- ProductId: objectId
- name: string
- productImage: string
- description: string
- price: number
- availableQuantity: number
- rating: number
- ratingCount: number
- isAssured: boolean, default false
- category: categoryId reference
- seller: sellerId reference seller id //optional

Category

- categoryId: objectId
- name: string

Cart

- cartId: ObjectId
- userId: userId reference
- cartItems: Array of CartItem SubDocuments
  - item: productReference
  - quantity: number

WishList

- wishListId: ObjectId
- userId: userId reference
- items: Array of CartItem SubDocuments
  - item: productReference

## Relationships

- A product can belong to one category, and a category can have multiple products.
- A cart belongs to one user, and a user can have one active cart.
- A cart can have multiple cart items embedded as subDocuments.
- A WishList belongs to one user, and a user can have one active WishList.
- A WishList can have multiple WishList items embedded as subDocuments.

## Indexes

- Users: `username`, `email`
- Products: `name`, `category_id`
- Cart: `user_id`
- WishList: `user_id`
