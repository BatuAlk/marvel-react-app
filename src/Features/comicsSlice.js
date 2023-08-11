import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	comics: [],
	total: 0,
	error: '',
	page: 0,
	loading: true,
};

export const getComics = createAsyncThunk(
	'comics/getComics',
	async (page) => {
		const ID = JSON.parse(
			localStorage.getItem('selectedCharacter')
		).id;
		const offset = page === undefined ? 0 : page * 10;
		const link = `https://gateway.marvel.com/v1/public/characters/${ID}/comics?orderBy=onsaleDate&limit=10&offset=${offset}&ts=1&apikey=ffe7fd022157e5255da0e1d729611171&hash=6c4e93f1c9f871c8f7cccfc68d0bd2bf`;
		const response = await axios.get(link);
		return response.data.data;
	}
);

const comicsSlice = createSlice({
	name: 'comics',
	initialState,
	reducers: {
		setComics(state, action) {
			state.comics = action.payload;
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
		setTotal(state, action) {
			state.total = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getComics.fulfilled, (state, action) => {
			state.comics = state.comics.concat(action.payload.results);
			state.total = action.payload.total;
			state.loading = false;
			state.error = '';
		});
		builder.addCase(getComics.rejected, (state, action) => {
			state.page = 0;
			state.error = action.error.message;
			state.loading = false;
			state.comics = [];
		});
		builder.addCase(getComics.pending, (state) => {
			state.loading = true;
		});
	},
});

export const {setComics, setPage, setLoading, setError} =
	comicsSlice.actions;
export default comicsSlice.reducer;
