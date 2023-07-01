import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/auth/tickets/ticketSlice'
import NoteReducer from '../features/auth/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    ticket:ticketReducer,
    notes:NoteReducer,
  },
});
