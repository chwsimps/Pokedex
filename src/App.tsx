import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { useEffect } from 'react';
import { getPokemon } from './app/pokemonSlice';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
