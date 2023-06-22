import {
  ChainLink,
  EvolutionChain,
  NamedAPIResource,
  Pokemon,
  PokemonSpecies,
} from 'pokenode-ts';

// --- Pokemon details ---
export const pokemonData = (pokemon: Pokemon) => ({
  // style
  imgSrc: pokemon.sprites.other?.dream_world.front_default as string,
  bgColor: pokemon.types[0].type.name,

  // data
  height: `${pokemon.height / 10}kg`,
  weight: `${pokemon.weight / 10}m`,
  abilities: pokemon.abilities.map((a) => a.ability.name),
  typeNames: pokemon.types.map((t) => t.type.name),
});

export const speciesData = (species: PokemonSpecies) => ({
  description: species.flavor_text_entries[0].flavor_text,
  speciesType: species.genera.find((g) => g.language.name === 'en')?.genus,
});

export const evolutionData = (evol: EvolutionChain) => ({
  evolutionChain: getSpecies(evol.chain),
});

interface EvolutionData {
  name: string;
  id: number;
}

const getSpecies = (obj: ChainLink, evolutionList: EvolutionData[] = []) => {
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

// Pokemon ID format
export const pokemonIdFormat = (num: number) =>
  `#${num.toString().padStart(4, '0')}`;
