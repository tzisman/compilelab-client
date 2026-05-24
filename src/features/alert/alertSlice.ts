import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AlertType = 'success' | 'error' | 'info';

interface AlertState {
  isOpen: boolean;
  message: string;
  type: AlertType;
}

const initialState: AlertState = {
  isOpen: false,
  message: '',
  type: 'info',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    
    showAlert: (
      state, 
      action: PayloadAction<{ message: string; type?: AlertType }>
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info'; 
    },
    
    closeAlert: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;