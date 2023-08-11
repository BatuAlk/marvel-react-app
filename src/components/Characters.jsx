import {useDispatch} from 'react-redux';
import {getCharacters} from '../Features/charactersSlice';
import CharacterList from '../Views/CharacterList';
import CharacterDetails from '../Views/CharacterDetails';
import {
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';

const Characters = () => {
	const dispatch = useDispatch();

	dispatch(getCharacters());

	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<CharacterList />
				</Route>
				<Route exact path='/characters/:id'>
					<CharacterDetails />
				</Route>
			</Switch>
		</Router>
	);
};

export default Characters;
