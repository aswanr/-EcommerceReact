import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../redux/cart'; 
import CartComponent from './cartitem';

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

test('renders CartComponent with items', () => {
  render(
    <Provider store={store}>
      <CartComponent />
    </Provider>
  );

  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();

  expect(screen.getByText(/Total Items: 3/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Price: ₹400/i)).toBeInTheDocument();

  expect(screen.getAllByAltText(/ProductImage/i)).toHaveLength(2);
});
