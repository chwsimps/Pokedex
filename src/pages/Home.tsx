import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import styles from '@/styles/Home.module.scss';
import Card from '../components/Card';
import { Pokemon } from 'pokenode-ts';

const Home = () => {
  const { pokemon } = useSelector((state: RootState) => state.pokemon);
  return (
    <>
      <h1 className={styles.header}>Pokédex</h1>

      <div className={styles.pokemon_container}>
        {pokemon?.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};

export default Home;
