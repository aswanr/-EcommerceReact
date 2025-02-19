import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../redux/cart"; 
import CartRemoveButton from "./cartButtons";

const initialState = {
  cart: {
    carlist: [
      {
        id: 1,
        category_id: 101,
        name: 'Product 1',
        price: 100,
        description: 'Description for Product 1',
        product_image: 'image1.jpg',
        created_time: '',
        count: 2,
      },
      {
        id: 2,
        category_id: 102,
        name: 'Product 2',
        price: 200,
        description: 'Description for Product 2',
        product_image: 'image2.jpg',
        created_time: '',
        count: 1,
      },
    ],
    cartcount: 3,
  },
};

const store = configureStore({
    reducer: {
      cart: cartReducer, 
    },
    preloadedState: {
      cart: initialState.cart, 
    },
  });

test('renders CartRemoveButton with initial count value', () => {
  const product = { id: 1 };
  
  render(
    <Provider store={store}>
      <CartRemoveButton {...product} />
    </Provider>
  );

  expect(screen.getByText(/3/i)).toBeInTheDocument();
});

test('increments the cart count when + button is clicked', () => {
  const product = { id: 1 };
  
  render(
    <Provider store={store}>
      <CartRemoveButton {...product} />
    </Provider>
  );

  fireEvent.click(screen.getByText('+'));

  expect(screen.getByText(/4/i)).toBeInTheDocument();
});

test('decrements the cart count when - button is clicked', () => {
  const product = { id: 1 };
  
  render(
    <Provider store={store}>
      <CartRemoveButton {...product} />
    </Provider>
  );

  fireEvent.click(screen.getByText('-'));

  expect(screen.getByText(/3/i)).toBeInTheDocument();
});
