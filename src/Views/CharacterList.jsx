import {useSelector, useDispatch} from 'react-redux';
import {
	setPage,
	getCharacters,
	setSelectedCharacter,
} from '../Features/charactersSlice';
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const CharacterList = () => {
	const dispatch = useDispatch();
	const {characters, loading, error, page, total} = useSelector(
		(state) => state.characters
	);

	const fetchNewCharacters = () => {
		dispatch(setPage());
		dispatch(getCharacters(page + 1));
	};

	const handleClick = (character) => {
		dispatch(setSelectedCharacter(character));
	};

	return (
		<div>
			{loading && <div className='loading'>Loading...</div>}

			{error && <div className='error'>{error}</div>}

			<InfiniteScroll
				dataLength={characters.length}
				next={fetchNewCharacters}
				hasMore={characters.length < total}
				className='characters'
			>
				{characters.map((character, index) => (
					<Link
						to={`/characters/${character.id}`}
						key={index}
						className='character'
						onClick={() => handleClick(character)}
					>
						<img
							className='character-image'
							src={
								character.thumbnail.path +
								'/portrait_xlarge.' +
								character.thumbnail.extension
							}
							alt={character.name}
						/>
						<div className='character-name'>{character.name}</div>
					</Link>
				))}
			</InfiniteScroll>
			{(characters.length === total && characters.length !== 0) && (
				<div className='end'>That's all the characters for now.</div>
			)}
		</div>
	);
};

export default CharacterList;
