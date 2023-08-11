import {configureStore} from '@reduxjs/toolkit';
import charactersReducer from '../Features/charactersSlice';
import comicsReducer from '../Features/comicsSlice';

export default configureStore({
	reducer: {
		characters: charactersReducer,
		comics: comicsReducer,
	},
});
