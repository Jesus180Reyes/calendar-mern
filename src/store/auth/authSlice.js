import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
name: 'auth',
initialState: {
    status: 'checking', // * authenticated , not-Authenticated
    user: {},
    errorMsg: undefined,


},
    reducers: {
    checking: (state, /* action */ ) => {
    state.status = 'checking';
    state.user; 
    state.errorMsg = undefined;
    },
    onLogin: (state, {payload}) => {
        state.status = 'authenticated';
        state.user = payload;
        state.errorMsg = undefined;

    },
    onLogout: (state,{payload}) => {
        state.status = 'not-Authenticated';
        state.user = {};
        state.errorMsg = payload;

    },
    clearErrorMessage: (state,)=> {
        state.errorMsg = undefined;
    }
    }
});
export const { checking,onLogin ,onLogout, clearErrorMessage} = authSlice.actions;