import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form1: { email: "", password: "" },
  form2: { firstName: "", lastName: "", address: "" },
};

const formSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateForm1: (state, action) => {
      state.form1 = { ...action.payload };
    },
    updateForm2: (state, action) => {
      state.form2 = { ...action.payload };
    }
  },
});

export const { updateForm1, updateForm2 } = formSlice.actions;

export default formSlice.reducer;
