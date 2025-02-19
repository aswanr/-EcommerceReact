import React from "react";
import "./cartButtons.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/cart";

interface products {
  id: number;
}
interface CartState {
  cart: {
    carlist: any[];
    cartcount: number;
  };
}

const CartRemoveButton = (products: products) => {
  const { cartcount } = useSelector((state: CartState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      
      <div className="cart-container1">
        <button
          className="cart-button"
          onClick={() => dispatch(increment(products))}
        >
          +
        </button>
        <div className="count-value">{cartcount}</div>
        <button
          className="cart-button"
          onClick={() => dispatch(decrement(products))}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartRemoveButton;
