import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Comics from '../components/Comics';
import {getComics} from '../Features/comicsSlice';
import {useEffect} from 'react';
import previous from '../images/previous.png';

const CharacterDetails = () => {
	const {loading, error} = useSelector((state) => state.characters);
	const dispatch = useDispatch();

	const selectedCharacter = JSON.parse(
		localStorage.getItem('selectedCharacter')
	);

	const description =
		selectedCharacter.description !== ''
			? selectedCharacter.description
			: 'No description available';

	useEffect(() => {
		dispatch(getComics(0));
	}, []);

	return (
		<div className='character-page'>
			{loading && <div className='loading'>Loading...</div>}
			{error && <div className='error'>{error}</div>}

			{!loading && (
				<div>
					<Link to='/'>
						{
							<div className='back'>
								<img
									src={previous}
									alt='go back'
									width={30}
									height={30}
								/>
								<p>Go Back</p>
							</div>
						}
					</Link>
					<h1>Character Info</h1>
					<div className='details'>
						<div className='character-image'>
							<img
								src={`${selectedCharacter.thumbnail.path}/portrait_xlarge.${selectedCharacter.thumbnail.extension}`}
								alt={selectedCharacter.name}
							/>
						</div>
						<div className='character-info'>
							<b>ID: </b>
							{selectedCharacter.id}
							<br />
							<b>Name: </b>
							{selectedCharacter.name}
							<br />
							<b>Description: </b>
							{description}
							<br />
							<b>Available Comics: </b>
							{selectedCharacter.comics.available}
						</div>
					</div>
					<hr />
					<div className='comics'>
						<Comics />
					</div>
				</div>
			)}
		</div>
	);
};

export default CharacterDetails;
