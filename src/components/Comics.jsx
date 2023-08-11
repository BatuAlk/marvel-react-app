import {getComics, setPage} from '../Features/comicsSlice';
import {useSelector, useDispatch} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const Comics = () => {
	const dispatch = useDispatch();
	const {comics, loading, error, page, total} = useSelector(
		(state) => state.comics
	);

	const fetchNewComics = () => {
		dispatch(setPage());
		dispatch(getComics(page + 1));
	};

	return (
		<div>
			{loading && <div>Loading...</div>}
			{error && <div>{error}</div>}

			<div>
				<h2>Comics</h2>
				<InfiniteScroll
					dataLength={comics.length}
					next={total > 10 ? fetchNewComics : null}
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
