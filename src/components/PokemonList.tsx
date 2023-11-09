// import { useState } from 'react';
import { PokemonNames } from '../interfaces/file.interface';
import useSWR from 'swr';
import './PokemonList.css';
import React from 'react';

import {
  getPokemon,
  getPokemonDetails,
  pokemonUrlEndpoint as cacheKey,
  pokemonDetailsUrlEndpoint as detailsCacheKey,
} from './api/pokemonApi';

function PokemonSprite({
  pokemonUrl,
  onClick,
}: {
  pokemonUrl: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const getId = Number(
    pokemonUrl
      .split('/')
      .filter((segment) => segment !== '')
      .pop()
  );
  const { error, data } = useSWR(
    [detailsCacheKey, getId],
    () => getPokemonDetails(getId),
    {
      onErrorRetry: (error) => {
        if (error.response.status === 404) return error.message;
      },
    }
  );
  if (error) return <p>◓ {error.message}</p>;
  if (!data) return <p>...</p>;
  return (
    <img src={data.sprites.front_default} alt='Pokemon' onClick={onClick} />
  );
}

function handleClick(e: React.MouseEvent) {
  e.preventDefault();
  console.log('Pokemon sprite clicked:', e);
}

function PokemonListItem({ pokemon }: { pokemon: PokemonNames }) {
  return (
    <li key={pokemon.name}>
      {pokemon.name} -{' '}
      <a href={pokemon.url} target='_blank' rel='noopener noreferrer'>
        View Details
      </a>{' '}
      <PokemonSprite pokemonUrl={pokemon.url} onClick={handleClick} />
    </li>
  );
}

export default function PokemonList() {
  const { error, data } = useSWR(cacheKey, getPokemon, {
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
        {results.map((pokemon: PokemonNames) => (
          <PokemonListItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
