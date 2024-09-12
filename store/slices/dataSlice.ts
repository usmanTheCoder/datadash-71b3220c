import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '..';

interface DataState {
  datasets: any[];
  selectedDataset: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  datasets: [],
  selectedDataset: null,
  isLoading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDatasets(state, action: PayloadAction<any[]>) {
      state.datasets = action.payload;
    },
    setSelectedDataset(state, action: PayloadAction<any | null>) {
      state.selectedDataset = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
  },
});

export const { setDatasets, setSelectedDataset, setIsLoading, setError } = dataSlice.actions;

export const selectDatasets = (state: RootState) => state.data.datasets;
export const selectSelectedDataset = (state: RootState) => state.data.selectedDataset;
export const selectIsLoading = (state: RootState) => state.data.isLoading;
export const selectError = (state: RootState) => state.data.error;

export default dataSlice.reducer;