import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from './app/store';
import { getPokemon } from './app/pokemonSlice';
import Home from './pages/Home';
import Details from './pages/Details';
import History from './pages/History';
import styles from '@/styles/App.module.scss';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch]);

  return (
    <div className={styles.app_container}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
