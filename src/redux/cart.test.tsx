import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart, increment, decrement} from "./cart";

describe("cartSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it("add product to cart", () => {
    const product = {
      id: 1,
      category_id: 1,
      name: "Product 1",
      price: 100,
      description: "Product description",
      product_image: "image.jpg",
      created_time: "2023-01-01",
      count: 1,
    };

    store.dispatch(addToCart(product));
    const state = store.getState().cart;

    expect(state.carlist).toHaveLength(1);
    expect(state.carlist[0]).toEqual(product);
    expect(state.cartcount).toBe(0);
  });

  it("increment cart count product", () => {
    const product = {
      id: 1,
      category_id: 1,
      name: "Product 1",
      price: 100,
      description: "Product description",
      product_image: "image.jpg",
      created_time: "2023-01-01",
      count: 1,
    };

    store.dispatch(addToCart(product));
    store.dispatch(increment({ id: 1 }));
    const state = store.getState().cart;

    expect(state.carlist[0].count).toBe(2);
    expect(state.cartcount).toBe(1);
  });

  it("decrement cart count product", () => {
    const product = {
      id: 1,
      category_id: 1,
      name: "Product 1",
      price: 100,
      description: "Product description",
      product_image: "image.jpg",
      created_time: "2023-01-01",
      count: 1,
    };

    store.dispatch(addToCart(product));
    store.dispatch(increment({ id: 1 }));
    store.dispatch(decrement({ id: 1 }));
    const state = store.getState().cart;

    expect(state.carlist[0].count).toBe(1);
    expect(state.cartcount).toBe(0);
  });

  it("below zero", () => {
    const product = {
      id: 1,
      category_id: 1,
      name: "Product 1",
      price: 100,
      description: "Product description",
      product_image: "image.jpg",
      created_time: "2023-01-01",
      count: 1,
    };

    store.dispatch(addToCart(product));
    store.dispatch(decrement({ id: 1 }));
    const state = store.getState().cart;

    expect(state.carlist[0].count).toBe(0);
    expect(state.cartcount).toBe(-1);
  });

  it("adding the same product multiple times", () => {
    const product = {
      id: 1,
      category_id: 1,
      name: "Product 1",
      price: 100,
      description: "Product description",
      product_image: "image.jpg",
      created_time: "2023-01-01",
      count: 1,
    };

    store.dispatch(addToCart(product));
    store.dispatch(addToCart(product));
    const state = store.getState().cart;

    expect(state.carlist).toHaveLength(1);
    expect(state.carlist[0].count).toBe(2);
  });
});
