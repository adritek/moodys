import { useState, useEffect } from 'react';
import './App.css';

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types?: any;
  abilities?: any;
  sprites?: any;
}

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getPokemonList() {
      try {
        const getPokemon = async (url: string): Promise<Pokemon> => {
          const dataResp = await fetch(url);
          return await dataResp.json();
        };

        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10');
        const listData = await response.json();
        setPokemonList(listData);

        const plist = await getPokemon(listData.results[0].url);
        setPokemon(plist);

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch dataList' + err);
        setLoading(true);
      }
    }

    getPokemonList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  if (!pokemon) {
    return <p>Didn't catch 'em all</p>;
  }

  return (
    <div>
      <h1>Pokemon Info</h1>
      <div className="card">
        <ul>
          <li key={pokemon.id}>
            <div className="card--title-center">
              <h3 className="card__h3--capitalise">{pokemon.name}</h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <p>
              <b>Height:</b> {pokemon.height}
            </p>
            <p>
              <b>Weight:</b> {pokemon.weight}
            </p>
            <p>
              <b>Pokemon type:</b>
            </p>
            {pokemon.types.map((el) => (
              <li className="point" key={`${el.type.name}+${pokemon.id}`}>
                {el.type.name}
              </li>
            ))}
            <b>Pokemon abilities:</b>
            {pokemon.abilities.map((ab) => (
              <li className="point" key={`${ab.ability.name}+${pokemon.id}`}>
                {ab.ability.name}
              </li>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
