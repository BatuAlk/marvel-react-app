import {getComics, setPage, setComics} from './slices/comicsSlice';
import {useSelector, useDispatch} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../scss/Comics.scss';

const Comics = () => {
	const dispatch = useDispatch();
	const {comics, loading, error, page, total} = useSelector(
		(state) => state.comics
	);
	const {id} = useParams();

	const fetchNewComics = () => {
		dispatch(setPage(page + 1));
		dispatch(getComics({page: page + 1, ID: id}));
	};

	useEffect(() => {
		dispatch(setPage(0));
		dispatch(setComics([]));
		dispatch(getComics({page: 0, ID: id}));
	}, []);

	return (
		<div>
			{loading && <div>Loading...</div>}
			{error && <div>{error}</div>}

			<div>
				{!loading && <h2>Comics</h2>}
				<InfiniteScroll
					dataLength={comics.length}
					next={fetchNewComics}
					hasMore={comics.length < total}
					className='comics'
				>
					{comics.map((comic, index) => (
						<div key={index}>
							<div className='comic'>
								<img
									src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
									alt={comic.title}
								/>
								<div className='comic-info'>
									<p>
										<b>{comic.title}</b>
									</p>
									<p>
										{comic.description === '' ||
										comic.description === null
											? 'No description available'
											: comic.description}
									</p>
								</div>
							</div>
							<hr />
						</div>
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default Comics;
