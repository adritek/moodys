export interface PokemonNames {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  next: string;
  previous?: PokemonNames | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  };
  abilities: {
    ability: {
      name: string;
    };
  };
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
  }[];
}
