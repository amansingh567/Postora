import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import themeSlice from './themeSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        theme : themeSlice,

        //TODO: add more slices here for posts
    }
});


export default store;