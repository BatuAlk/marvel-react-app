import Header from './components/Header';
import {useDispatch} from 'react-redux';
import {getCharacters} from './Redux/charactersSlice';
import CharacterList from './Redux/CharacterList';
import CharacterDetails from './Redux/CharacterDetails';
import {
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';
import './scss/App.scss';

function App() {
	const dispatch = useDispatch();
	dispatch(getCharacters());

	return (
		<div>
			<Header />
			<Router>
				<Switch>
					<Route exact path='/marvel-react-app'>
						<CharacterList />
					</Route>
					<Route exact path='/characters/:id'>
						<CharacterDetails />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
