import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  period: 30 // in days
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      state.period = action.payload.period;

    },
  },
});

// Action creators are generated for each case reducer function
export const { setPeriod } =
uiSlice.actions;



export default uiSlice.reducer;
