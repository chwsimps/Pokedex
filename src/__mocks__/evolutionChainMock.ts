import { EvolutionChain } from 'pokenode-ts';

export const evolutionChainMock: EvolutionChain = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: 160,
            min_level: null,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: '',
            trade_species: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                item: {
                  name: 'thunder-stone',
                  url: 'https://pokeapi.co/api/v2/item/83/',
                },
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: null,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: '',
                trade_species: null,
                trigger: {
                  name: 'use-item',
                  url: 'https://pokeapi.co/api/v2/evolution-trigger/3/',
                },
                turn_upside_down: false,
              },
            ],
            evolves_to: [],
            is_baby: false,
            species: {
              name: 'raichu',
              url: 'https://pokeapi.co/api/v2/pokemon-species/26/',
            },
          },
        ],
        is_baby: false,
        species: {
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
        },
      },
    ],
    is_baby: true,
    species: {
      name: 'pichu',
      url: 'https://pokeapi.co/api/v2/pokemon-species/172/',
    },
  },
  id: 10,
};
