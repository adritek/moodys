// import { useState } from 'react';
import { AxiosList } from '../interfaces/file.interface';
import useSWR from 'swr';
import axios from 'axios';
import './PokemonList.css';
import React from 'react';

function PokemonSprite({
  spriteUrl,
}: {
  spriteUrl: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };
  const { data, error } = useSWR(spriteUrl, fetcher, {
    onErrorRetry: (error) => {
      if (error.response.status === 404) return error.message;
    },
  });

  if (error) return <p>◓</p>;
  if (!data) return <p>...</p>;
  return <img src={data.sprites.front_default} alt='Pokemon' />;
}

function handleClick(e: React.MouseEvent) {
  e.preventDefault();
  console.log(e);
}

function PokemonListItem({ pokemon }: { pokemon: AxiosList }) {
  return (
    <li key={pokemon.name}>
      {pokemon.name} -{' '}
      <a href={pokemon.url} target='_blank' rel='noopener noreferrer'>
        View Details
      </a>{' '}
      <PokemonSprite spriteUrl={pokemon.url} onClick={handleClick} />
    </li>
  );
}

export default function PokemonList() {
  const pokeApi = 'https://pokeapi.co/api/v2/pokemon/?limit=6';
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, error } = useSWR(pokeApi, fetcher, {
    onErrorRetry: (error) => {
      if (error.response.status === 404) return error.message;
    },
  });

  if (error) {
    return (
      <div>
        <p>（╯°□°）╯︵◓</p>
        <b>Error loading data:</b>
        <p> {error.message}</p>
        <small>... couldn't catch them all</small>
      </div>
    );
  }

  if (!data) {
    return <p>Loading... {'(ノ^◡^)ノ︵◓'}</p>;
  }

  const { results } = data;

  return (
    <div id='pokemonList'>
      <h3>Pokemon List</h3>
      <ul>
        {results.map((pokemon: AxiosList) => (
          <PokemonListItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
