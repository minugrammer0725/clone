api endpoints (/api):


/users

  GET '/:userId'
    => return single user
  GET '/'
    => return all users
  POST '/'
    => create a new user (sign up)
  PUT '/:userId'
    => update user info (username, etc)


/restaurants

  GET '/:restaurantId'
    => return single restaurant
  GET '/'
    => return all restaurants
  POST '/'
    => create new restaurant
  PUT '/:restaurantId'
    => update restaurant(menu, review, etc)
    

/dishes

  GET '/:dishId'
    => return single dish
  GET '/restaurant/:restaurantId'
    => return all dishes from a restaurant
  GET '/'
    => return all dishes
  POST '/'
    => create new dish item
  PUT '/:dishId' 
    => update dish info (maybe not necessary)


/reviews

  GET '/:reviewId'
    => return single review
  GET '/'
    => return all reviews
  POST '/'
    => create new review


/dashers

  GET '/:dasherId'
    => return single dasher
  GET '/'
    => return all dashers
  GET '/random'
    => return random available dasher
  POST '/'
    => create new dasher
  PUt '/:dasherId'
    => update dasher info(availability, etc)


/addresses

  GET '/:addressId'
    => return single address
  POST '/'
    => create new address for user, should be completed when new user sign up
  PUT '/:addressId'
    => update user address



/carts

  GET '/:cartId'
    => return single cart
  GET '/'
    => return all carts (maybe not necessary)
  PUT '/:cartId'
    => update cart(item, restaurant, etc)


/cartItems

  GET '/:cartItemId'
    => return single cart item
  GET '/'
    => return all cart items (maybe not necessary)
  POST '/'
    => create new cart item for cart (append to cart)
  PUT '/:cartItemId'
    => update cart item (quantity, etc)
  DELETE '/:cartItemId'
    => remove cart item from cart


/orders

  GET '/:orderId'
    => return single order info
  GET '/user/:userId'
    => return all orders from a user
  GET '/'
    => return all orders
  POST '/'
    => create new order
  PUT '/:orderId'
    => update order(status, etc)


/login

  POST '/'
    => verify user credentials and return jwt if verified



/admin (admin to change order status)
