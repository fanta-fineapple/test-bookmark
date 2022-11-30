import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    replaceData: (state, action) => (state = action.payload),
    updateFriends: (state, action) => {
      state.friends = action.payload;
    },
    deleteFriend: (state, action) => {
      const existingItem = state.find((el) => el.id === action.payload);
      existingItem.quantity--;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    },
    favoriteT: (state, action) => {
      state.favorite.push(action.payload);
    },
    favoriteF: (state, action) => ({
      ...state,
      favorite: state.favorite.filter((item) => item.id !== action.payload),
    }),
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
