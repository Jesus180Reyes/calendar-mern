import {configureStore} from '@reduxjs/toolkit'
import { uiSlice } from './';
import { calendarSlice } from './calendar/calendarSlice';
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare({
        serializableCheck:false,
    }),
});