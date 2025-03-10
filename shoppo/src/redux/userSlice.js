
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  access_token: '',
  isAdmin: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {  
      console.log("🛠 Dữ liệu nhận vào Redux:", action.payload); 

      if (action.payload) {
        state.id = action.payload._id ?? state.id;  
        state.name = action.payload.name ?? state.name;
        state.email = action.payload.email ?? state.email;
        state.phone = action.payload.phone ?? state.phone;
        state.access_token = action.payload.access_token ?? state.access_token;  
        state.isAdmin = action.payload.isAdmin ?? state.isAdmin;
      } else {
        console.error("❌ Không có dữ liệu hợp lệ trong action.payload!");
      }
    },

    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
    },
    setUser: (state, action) => {
      state.id = action.payload._id; 
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.access_token = action.payload.access_token;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { updateUser, resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
