import { NamedAPIResource, NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_URL = `${BASE_URL}/pokemon`;

// Observables for an Ajax request
const resourceList$: Observable<NamedAPIResource[]> = ajax
  .getJSON<NamedAPIResourceList>(POKEMON_URL)
  .pipe(
    map((resourceList: NamedAPIResourceList) => resourceList.results),
    catchError((error) => handleError(error)),
  );

export const pokemonList$: Observable<Pokemon[]> = resourceList$.pipe(
  switchMap((resources: NamedAPIResource[]) =>
    combineLatest(
      resources.map((resource: NamedAPIResource) =>
        ajax.getJSON<Pokemon>(resource.url),
      ),
    ),
  ),
  catchError((error) => handleError(error)),
);

// Error handling
const handleError = (error: any) => {
  return throwError(() => error);
};
