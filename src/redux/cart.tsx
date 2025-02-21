import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productid{
  id:number
}

interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  product_image: string;
  created_time: string;
  count: number;
}

interface CartState {
  carlist: Product[];
  cartcount: number;
}

const initialState: CartState = {
  carlist: [],
  cartcount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item=state.carlist.find((item)=>item.id === action.payload.id);
      if(item){
        state.carlist.forEach((item)=>{
          if(item?.id === action.payload.id){
            item.count++;
            console.log(state.carlist)
          }
          return
        })
      }
      else{
        state.carlist.push({
          ...action.payload,
          count: 1,
        })
      }

    },
    increment: (state,action: PayloadAction<productid>) => {
      state.cartcount+=1
      const productid=action.payload.id;
      state.carlist.forEach((item)=>{
        if(item.id === productid){
          item.count++;
          console.log(state.carlist)
        }
      });
    },
    decrement: (state,action: PayloadAction<productid>) => {
      state.cartcount-=1
      const productid=action.payload.id;
      state.carlist.forEach((item)=>{
        if(item.id === productid){
          item.count--;
          console.log(state.carlist)
        }
      });
    },
  },
});

export const { addToCart, decrement, increment } = cartSlice.actions;
export default cartSlice.reducer;
