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
    deletefav: (state, action) =>
      state.filter((el) => el.id !== action.payload),
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
