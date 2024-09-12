// src/store/reducers/carsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const carsSlice = createSlice({
  name: 'cars',
  initialState: [],
  reducers: {
    addCar: (state, action) => {
      state.push(action.payload);
    },
    updateCar: (state, action) => {
      const index = state.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Add more reducers as needed
  },
});

export const { addCar, updateCar } = carsSlice.actions;
export default carsSlice.reducer;

// src/store/reducers/appointmentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: [],
  reducers: {
    addAppointment: (state, action) => {
      state.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.findIndex(appointment => appointment.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Add more reducers as needed
  },
});

export const { addAppointment, updateAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;