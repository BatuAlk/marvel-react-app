import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	characters: [],
	total: 0,
	selectedCharacter: {},
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
			'&ts=1&apikey=6e85efbf70c603924a313f9cd73fc263&hash=9156337c7a6efaf8e727cde69c0d5aed';
		const response = await axios.get(link);
		return response.data.data;
	}
);

export const getCharacter = createAsyncThunk(
	'characters/getCharacter',
	async (id) => {
		const link =
			'https://gateway.marvel.com/v1/public/characters/' +
			id +
			'?&ts=1&apikey=6e85efbf70c603924a313f9cd73fc263&hash=9156337c7a6efaf8e727cde69c0d5aed';
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

		builder.addCase(getCharacter.fulfilled, (state, action) => {
			state.selectedCharacter = action.payload.results[0];
			state.loading = false;
			state.error = '';
		});
		builder.addCase(getCharacter.rejected, (state, action) => {
			state.error = action.error.message;
			state.loading = false;
			state.selectedCharacter = {};
		});
		builder.addCase(getCharacter.pending, (state) => {
			state.loading = true;
		});
	},
});

export const {setCharacters, setPage, setLoading, setError} =
	charactersSlice.actions;
export default charactersSlice.reducer;
