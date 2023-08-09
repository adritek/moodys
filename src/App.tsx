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

      <Card hoverable style={{ width: 300 }} cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}>
        <Meta className="card__h3--capitalise" title={pokemon.name} />
        <p>
          <b>Height:</b> {pokemon.height}
        </p>
        <p>
          <b>Weight:</b> {pokemon.weight}
        </p>
        <b>Pokemon type:</b>
        <ul>
          {pokemon.types.map((el) => (
            <li className="label color-purple" key={`${el.type.name}+${pokemon.id}`}>
              {el.type.name}
            </li>
          ))}
        </ul>

        <b>Pokemon abilities:</b>
        <ul>
          {pokemon.abilities.map((ab) => (
            <li className="point" key={`${ab.ability.name}+${pokemon.id}`}>
              <span className="label color-green">{ab.ability.name}</span>
            </li>
          ))}
        </ul>

        <div>
          <h3>Stats:</h3>
          <p>HP: {pokemon.stats[0].base_stat}</p>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
          <p>Defence: {pokemon.stats[2].base_stat}</p>
          <p>Sp. Attack: {pokemon.stats[3].base_stat}</p>
          <p>Sp. Defence: {pokemon.stats[4].base_stat}</p>
          <p>Speed: {pokemon.stats[5].base_stat}</p>
        </div>
      </Card>
    </div>
  );
}
