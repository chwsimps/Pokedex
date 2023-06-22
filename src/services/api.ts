import {
  EvolutionChain,
  NamedAPIResource,
  NamedAPIResourceList,
  Pokemon,
  PokemonSpecies,
} from 'pokenode-ts';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

// Base URLs
const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_URL = `${BASE_URL}/pokemon`;

// Observables related to pokemon api
// Get rosource list for pokemon urls
const resourceList$: Observable<NamedAPIResource[]> = ajax
  .getJSON<NamedAPIResourceList>(POKEMON_URL)
  .pipe(
    map((resourceList: NamedAPIResourceList) => resourceList.results),
    catchError((error) => handleError(error)),
  );

// Get list of pokemon
export const pokemonList$: Observable<Pokemon[]> = resourceList$.pipe(
  switchMap((resources: NamedAPIResource[]) =>
    combineLatest(
      resources.map((resource: NamedAPIResource) =>
        ajax.getJSON<Pokemon>(resource.url),
      ),
    ),
  ),
  catchError((error: Error) => handleError(error)),
);

// Get pokemon by name or id
export const pokemonByNameOrId$ = (
  value: string | number,
): Observable<Pokemon> =>
  ajax
    .getJSON<Pokemon>(`${POKEMON_URL}/${value}`)
    .pipe(catchError((error: Error) => handleError(error)));

// Get species by id
export const speciesByUrl$ = (url: string): Observable<PokemonSpecies> =>
  ajax
    .getJSON<PokemonSpecies>(url)
    .pipe(catchError((error: Error) => handleError(error)));

// Get evolution chain by id
export const evolutionChainByUrl$ = (url: string): Observable<EvolutionChain> =>
  ajax
    .getJSON<EvolutionChain>(url)
    .pipe(catchError((error: Error) => handleError(error)));

// Error handling
const handleError = (error: Error) => {
  const errorMessage = `An error occurred: ${error.message}`;
  return throwError(() => new Error(errorMessage));
};
