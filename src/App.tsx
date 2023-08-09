import { useState, useEffect } from 'react';
import './App.css';
import { PokemonList, Pokemon } from './interfaces/file.interface';
import { Card } from 'antd';

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { Meta } = Card;
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

  if (!pokemon) {
    return <p>Didn't catch 'em all</p>;
  }

  return (
    <div>
      <h1>Pokemon Info</h1>
      {/* Basic card with a photo */}
      <Card hoverable style={{ width: 240 }} cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}>
        <Meta className="card__h3--capitalise" title={pokemon.name} />
        <p>
          <b>Height:</b> {pokemon.height}
        </p>
        <p>
          <b>Weight:</b> {pokemon.weight}
        </p>
        <p>
          <b>Pokemon type:</b>
          <ul>
            {pokemon.types.map((el) => (
              <li className="point" key={`${el.type.name}+${pokemon.id}`}>
                {el.type.name}
              </li>
            ))}
          </ul>
        </p>
        <p>
          <b>Pokemon abilities:</b>
          <ul>
            {pokemon.abilities.map((ab) => (
              <li className="point" key={`${ab.ability.name}+${pokemon.id}`}>
                {ab.ability.name}
              </li>
            ))}
          </ul>
        </p>
      </Card>
    </div>
  );
}
