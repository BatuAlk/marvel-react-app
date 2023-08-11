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
	async (values) => {
		const {ID, page} = values;
		const offset = page === undefined ? 0 : page * 10;
		const link = `https://gateway.marvel.com/v1/public/characters/${ID}/comics?orderBy=onsaleDate&limit=10&offset=${offset}&ts=1&apikey=6e85efbf70c603924a313f9cd73fc263&hash=9156337c7a6efaf8e727cde69c0d5aed`;
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
		setPage(state, action) {
			state.page = action.payload;
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
