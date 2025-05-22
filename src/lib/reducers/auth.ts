import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isAuthError: false
    },
    reducers: {
        SIGN_IN_REQUEST: (state, action) => {

        },
        SIGN_IN_RESPONSE_SUCCESS: (state, action) => {
            state.isAuth = true;
            state.isAuthError = false;
        },
        SIGN_IN_RESPONSE_ERROR: (state) => {
            state.isAuthError = true;
        },
        SIGN_OUT: (state) => {

        },
        SIGN_OUT_SUCCESS: (state) => {
            state.isAuth = false;
        },
        INITIAL_TOKEN: (state) => {
        }
    }
});

export const {
    SIGN_IN_REQUEST,
    SIGN_IN_RESPONSE_SUCCESS,
    SIGN_IN_RESPONSE_ERROR,
    INITIAL_TOKEN,
    SIGN_OUT,
    SIGN_OUT_SUCCESS
} = auth.actions;
export default auth.reducer;