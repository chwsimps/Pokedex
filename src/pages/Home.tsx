import { useSelector } from 'react-redux';
import { Pokemon } from 'pokenode-ts';
import { RootState } from '../app/store';
import Card from '../components/Card';
import Input from '../components/Input';
import RouterLink from '../components/RouterLink';
import styles from '@/styles/App.module.scss';

const Home = () => {
  // Redux hooks
  const { pokemonList } = useSelector((state: RootState) => state.pokemon);

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>
        Pokédex
        <RouterLink to="/history" className={styles.main_header_link}>
          View History
        </RouterLink>
      </h1>

      <Input />

      <div className={styles.pokemon_card_container}>
        {pokemonList.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
