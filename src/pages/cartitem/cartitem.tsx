import React from 'react';
import { useSelector } from "react-redux";  
import './cartitem.css';

interface CartItem {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  product_image?: string;
  count: number;
}

interface CartState {
  cart: {
    carlist: CartItem[];
    cartcount: number;
  };
}

const CartComponent: React.FC = () => {
  const { carlist } = useSelector((state: CartState) => state.cart); 
  console.log(carlist)
  return (
    <div className="cart-container">
      <h1>Cart Items</h1>
      <div className="cart-items">
        {carlist.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.product_image} alt="ProductImage"/>
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.count}</p>
            </div>
            <button className="remove-btn">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {carlist.reduce((acc, item) => acc + item.count, 0)}</p>
        <p>Total Price: ₹{carlist.reduce((acc, item) => acc + item.price * item.count, 0)}</p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartComponent;
