export interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types?: any;
  abilities?: any;
  sprites?: any;
  stats: {
    base_stat: number;
  }[]
}