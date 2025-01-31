import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ad, AdState } from '../types/ad';

const initialState: AdState = {
  trackedAds: {},
};

export const adSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    toggleTracking: (state, action: PayloadAction<Ad>) => {
      const ad = action.payload;
      if (state.trackedAds[ad.ad_id]) {
        delete state.trackedAds[ad.ad_id];
      } else {
        state.trackedAds[ad.ad_id] = ad;
      }
    },
  },
});

export const { toggleTracking } = adSlice.actions;
export default adSlice.reducer;