import {
  ChainLink,
  EvolutionChain,
  Pokemon,
  PokemonSpecies,
} from 'pokenode-ts';
import { EvolutionChainData } from './interfaces';

// --- Pokemon details ---
export const pokemonData = (pokemon: Pokemon) => ({
  // style
  imgSrc: pokemon.sprites.other?.dream_world.front_default as string,
  bgColor: pokemon.types[0].type.name,

  // data
  pokemonNum: `#${pokemon.id.toString().padStart(4, '0')}`,
  height: `${pokemon.height / 10}kg`,
  weight: `${pokemon.weight / 10}m`,
  abilities: pokemon.abilities.map((a) => a.ability.name.replace('-', ' ')),
  typeNames: pokemon.types.map((t) => t.type.name.replace('-', ' ')),
  moves: pokemon.moves.slice(-10).map((m) => m.move.name.replace('-', ' ')),
});

export const speciesData = (species: PokemonSpecies) => ({
  description: species.flavor_text_entries.find(
    (text) => text.language.name === 'en',
  )?.flavor_text,
  speciesType: species.genera.find((g) => g.language.name === 'en')?.genus,
});

export const evolutionData = (evol: EvolutionChain) => ({
  evolutionChain: getSpecies(evol.chain),
});

const getSpecies = (
  obj: ChainLink,
  evolutionList: EvolutionChainData[] = [],
) => {
  if (obj.species) {
    const urlId = obj.species.url.split('/');
    evolutionList.push({
      name: obj.species.name,
      id: parseInt(urlId[urlId.length - 2]),
    });
  }

  if (obj.evolves_to) {
    obj.evolves_to.forEach((evo) => getSpecies(evo, evolutionList));
  }

  return evolutionList;
};
