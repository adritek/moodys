import './App.css';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import {
  pokemonUrlEndpoint,
  getPokemon,
  pokemonDetailsUrlEndpoint as detailsCacheKey,
  getPokemonDetails,
} from './components/api/pokemonApi';

import {
  UrlPokemonNames,
  // UrlPokemonDetails,
} from './interfaces/file.interface';

// import { getDetails } from './loaders';

import typeColors from './components/utilities/typeColours';
// import Details from './pages/Details';

function extractIdFromUrl(url: string): number {
  const segments = url.split('/').filter((segment) => segment !== '');
  return Number(segments.pop());
}

function PokemonDetailsTile({ url }: { url: string }) {
  const id = extractIdFromUrl(url);
  const { data, error, isLoading } = useSWR(
    [detailsCacheKey, id],
    () => getPokemonDetails(id),
    {
      revalidateOnFocus: false,
    }
  );

  if (error) return <p>Error: {error.message}</p>;
  if (!data || isLoading) return <p>Loading...</p>;

  const type = data.types[0].type.name.toLowerCase();
  const backgroundColor = typeColors[type] || 'grey';

  return (
    <Link to='Details'>
      <div className={`tile ${backgroundColor}`}>
        <p>{data.id}</p>
        <img src={data.sprites.front_default} alt={data.name} />
        <p>{data.name}</p>
        <p className='label'>{data.types[0].type.name}</p>
      </div>
    </Link>
  );
}

export default function App() {
  const {
    data: pokemonData,
    error: pokemonError,
    isValidating: isLoading,
  } = useSWR(pokemonUrlEndpoint, getPokemon, {
    revalidateOnFocus: false,
  });

  if (pokemonError) return <p>Error: {pokemonError.message}</p>;
  if (!pokemonData || isLoading) return <p>Loading...</p>;

  return (
    <main>
      <ul>
        {pokemonData.results.map((pokemon: UrlPokemonNames) => (
          <li key={pokemon.name}>
            <PokemonDetailsTile url={pokemon.url} />
          </li>
        ))}
      </ul>
    </main>
  );
}
