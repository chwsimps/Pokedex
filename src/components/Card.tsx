import styles from '@/styles/Card.module.scss';
import { Pokemon } from 'pokenode-ts';

interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const imgSrc = pokemon.sprites.other?.dream_world.front_default as string;

  return (
    <div className={styles.pokemon_card}>
      <h3>{pokemon.name}</h3>
      <img
        src={imgSrc}
        className={styles.pokemon_card_img}
        alt={pokemon.name}
      />
    </div>
  );
};

export default Card;
