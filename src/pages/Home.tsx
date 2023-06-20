import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';

const Home = () => {
  const { pokemon } = useSelector((state: RootState) => state.pokemon);
  return (
    <div>
      <h1>Pokemon</h1>
      <Link to="/details">Details</Link>
      {pokemon?.map((poke) => (
        <div key={poke.id} className="card">
          <h3>{poke.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
