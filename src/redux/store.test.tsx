import { configureStore, createAction } from "@reduxjs/toolkit";
import cartSlicereducer from "./cart";
import { AnyAction } from "redux";

const mockCartReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case "cart/addItem":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const store = configureStore({
    reducer: {
        cart: cartSlicereducer,
    },
});

test('get the reducer', () => {
    const store = configureStore({
        reducer: {
            cart: mockCartReducer,
        },
    });

    const addItem = createAction<{ id: number, name: string }>("cart/addItem");
    const state = store.getState();
    expect(state.cart).toEqual({});

    store.dispatch(addItem({ id: 1, name: 'Test Item' }));
    const updatedState = store.getState();
    expect(updatedState.cart).toEqual({ id: 1, name: 'Test Item' });
});
