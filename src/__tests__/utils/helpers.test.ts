import { pokemonData, speciesData, evolutionData } from '../../utils/helpers';
import { pokemonMock } from '../../__mocks__/pokemonMock';
import { speciesMock } from '../../__mocks__/speciesMock';
import { evolutionChainMock } from '../../__mocks__/evolutionChainMock';

describe('pokemonData', () => {
  it('returns the correct data for a given Pokemon (Pikachu)', () => {
    const expected = {
      imgSrc:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      bgColor: 'electric',
      pokemonNum: '#0025',
      height: '0.4kg',
      weight: '6m',
      abilities: ['static', 'lightning rod'],
      typeNames: ['electric'],
      moves: [
        'mega kick',
        'headbutt',
        'body slam',
        'take down',
        'double edge',
        'tail whip',
        'growl',
        'surf',
        'submission',
        'counter',
      ],
    };
    expect(pokemonData(pokemonMock)).toEqual(expected);
  });
});

describe('speciesData', () => {
  it('returns the correct data for a given Pokemon species', () => {
    const expected = {
      description:
        'When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.',
      speciesType: 'Mouse Pokémon',
    };
    expect(speciesData(speciesMock)).toEqual(expected);
  });
});

describe('evolutionData', () => {
  it('returns the correct evolution chain details for a given Pokemon', () => {
    const expected = [
      { name: 'pichu', id: 172 },
      { name: 'pikachu', id: 25 },
      { name: 'raichu', id: 26 },
    ];
    expect(evolutionData(evolutionChainMock).evolutionChain).toEqual(expected);
  });
});
