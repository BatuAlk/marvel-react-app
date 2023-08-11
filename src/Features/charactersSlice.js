import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	characters: [],
	selectedCharacter: Object(),
	total: 0,
	error: '',
	page: 0,
	loading: true,
};

export const getCharacters = createAsyncThunk(
	'characters/getCharacters',
	async (page) => {
		const offset =
			page === undefined ? parseInt(0) : parseInt(page * 30);
		const link =
			'https://gateway.marvel.com/v1/public/characters?&limit=30&offset=' +
			offset +
			'&ts=1&apikey=ffe7fd022157e5255da0e1d729611171&hash=6c4e93f1c9f871c8f7cccfc68d0bd2bf';
		const response = await axios.get(link);
		return response.data.data;
	}
);

const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setCharacters(state, action) {
			state.characters = action.payload;
		},
		setPage(state) {
			state.page += 1;
		},
		setLoading(state) {
			state.loading = !state.loading;
		},
		setError(state, action) {
			state.error = action.payload;
		},
		setSelectedCharacter(state, action) {
			state.selectedCharacter = action.payload;
			localStorage.setItem(
				'selectedCharacter',
				JSON.stringify(action.payload)
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCharacters.fulfilled, (state, action) => {
			state.characters = state.characters.concat(
				action.payload.results
			);
			state.total = action.payload.total;
			state.loading = false;
			state.error = '';
		});
		builder.addCase(getCharacters.rejected, (state, action) => {
			state.error = action.error.message;
			state.page = 0;
			state.loading = false;
			state.characters = [];
		});
		builder.addCase(getCharacters.pending, (state) => {
			state.loading = true;
		});
	},
});

export const {
	setCharacters,
	setPage,
	setLoading,
	setError,
	setSelectedCharacter,
} = charactersSlice.actions;
export default charactersSlice.reducer;
