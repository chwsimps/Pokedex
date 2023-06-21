import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import styles from '@/styles/Home.module.scss';
import Card from '../components/Card';
import { Pokemon } from 'pokenode-ts';
import Input from '../components/Input';

const Home = () => {
  // Redux hooks
  const { pokemon } = useSelector((state: RootState) => state.pokemon);

  return (
    <>
      <h1 className={styles.header}>Pokédex</h1>

      <Input />

      <div className={styles.pokemon_container}>
        {pokemon?.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};

export default Home;
