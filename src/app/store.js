import {configureStore} from '@reduxjs/toolkit';
import charactersReducer from '../Redux/slices/charactersSlice';
import comicsReducer from '../Redux/slices/comicsSlice';

export default configureStore({
	reducer: {
		characters: charactersReducer,
		comics: comicsReducer,
	},
});
