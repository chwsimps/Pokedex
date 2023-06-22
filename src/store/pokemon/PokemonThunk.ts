import { createAsyncThunk } from '@reduxjs/toolkit';
import { lastValueFrom } from 'rxjs';
import {
  evolutionChainById$,
  pokemonByNameOrId$,
  pokemonList$,
  speciesByName$,
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
    const species = await lastValueFrom(speciesByName$(pokemon.id));
    const evolution = await lastValueFrom(evolutionChainById$(pokemon.id));
    return { selected: pokemon, species, evolution };
  },
);
