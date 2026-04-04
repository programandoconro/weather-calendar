import { Location } from "@/app/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Location = {
  // Dummy Initial Coors
  latitude: process.env.LAT || "35.6895",
  longitude: process.env.LON || "139.6917",
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
