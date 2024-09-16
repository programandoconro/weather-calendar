import { Location } from "@/app/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Location = {
  latitude: "",
  longitude: "",
};

const coordinatesSlice = createSlice({
  name: "coordinates reducer",
  initialState,

  reducers: {
    setCoordinates: (state, action: PayloadAction<Location>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setCoordinates } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
