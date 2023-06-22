import { Pokemon } from 'pokenode-ts';

// --- Pokemon details ---
export const pokemonData = (pokemon: Pokemon) => ({
  imgSrc: pokemon.sprites.other?.dream_world.front_default as string,
  typeNames: pokemon.types.map((t) => t.type.name),
  bgColor: pokemon.types[0].type.name,
});

// Pokemon ID format
export const pokemonIdFormat = (num: number) =>
  `#${num.toString().padStart(4, '0')}`;
