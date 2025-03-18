import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@store/store';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.items = [];
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = newItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);
      
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        
        // Remove the item from the array if quantity reaches 0
        if (existingItem.quantity <= 0) {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const {removeItem, addItem, clearCart} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectItemCountById = (id: string) =>
  createSelector(selectCartItems, items => {
    const item = items.find((item: any) => item._id === id);
    return item ? item?.quantity : 0;
  });

export const selectTotalItemsInCart = createSelector(selectCartItems, items => {
  return items.reduce((total, item) => total + item?.quantity, 0);
});
export const selectTotalCartPrice = createSelector(selectCartItems, items => {
  return items.reduce((total, item) => total + item?.totalPrice, 0);
});

export default cartSlice.reducer;