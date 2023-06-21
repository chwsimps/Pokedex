import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';

const Details = () => {
  // Redux hooks
  const { selectedPokemon: pokemon } = useSelector(
    (state: RootState) => state.pokemon,
  );

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>{pokemon?.name}</h1>
    </div>
  );
};

export default Details;
