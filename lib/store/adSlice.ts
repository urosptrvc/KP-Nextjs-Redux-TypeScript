import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdState } from '@/lib/types/ad';

const initialState: AdState = {
  trackedAds: [],
};

export const adSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    toggleTracking: (state, action: PayloadAction<number>) => {
      const adId = action.payload;
      const index = state.trackedAds.indexOf(adId);
      
      if (index === -1) {
        state.trackedAds.push(adId);
      } else {
        state.trackedAds.splice(index, 1);
      }
    },
  },
});

export const { toggleTracking } = adSlice.actions;
export default adSlice.reducer;