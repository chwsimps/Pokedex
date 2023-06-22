import { createAsyncThunk } from '@reduxjs/toolkit';
import { lastValueFrom } from 'rxjs';
import {
  evolutionChainByUrl$,
  pokemonByNameOrId$,
  pokemonList$,
  speciesByUrl$,
} from '../../services/api';

// Async thunks
export const getPokemon = createAsyncThunk(
  'pokemon/getPokemon',
  async () => await lastValueFrom(pokemonList$),
);

export const getPokemonByName = createAsyncThunk(
  'pokemon/getPokemonByName',
  async (name: string) => await lastValueFrom(pokemonByNameOrId$(name)),
);

export const getPokemonDetails = createAsyncThunk(
  'pokemon/getPokemonDetails',
  async (id: number) => {
    const pokemon = await lastValueFrom(pokemonByNameOrId$(id));
    const species = await lastValueFrom(speciesByUrl$(pokemon.species.url));
    const evolution = await lastValueFrom(
      evolutionChainByUrl$(species.evolution_chain.url),
    );
    return { selected: pokemon, species, evolution };
  },
);
