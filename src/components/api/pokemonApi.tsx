import axios from 'axios';

export const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const pokemonUrlEndpoint = '/pokemon/?limit=12';
export const pokemonDetailsUrlEndpoint = '/pokemon/';

export const getPokemon = async () => {
  const response = await pokemonApi.get(pokemonUrlEndpoint);
  return response.data;
};

export const getPokemonDetails = async (id: number) => {
  const response = await pokemonApi.get(pokemonDetailsUrlEndpoint + `${id}`);
  return response.data;
};
