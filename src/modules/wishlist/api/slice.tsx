import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";


interface wishlitItem {
    _id:string
    name:string
    price:number
}

interface wishlistState {
    items: wishlitItem[]
}

const initialState:wishlistState ={
    items:[]
}


export const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addToWishlist:(state,action:PayloadAction<wishlitItem>)=>{
                let newItem = action.payload
                const existingItem = state.items.find((item)=> item._id === newItem._id )
                if(!existingItem){
                    state.items.push(newItem)
                }
        },
        removeFromWishlist:(state,action:PayloadAction<string>)=>{
            const itemId = action.payload
                state.items = state.items.filter((item)=>item._id !== itemId )
        }
    }
})


export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectIsItemInWishlist = (id: string) =>
  createSelector(selectWishlistItems, items => items.some(item => item._id === id));

export default wishlistSlice.reducer;