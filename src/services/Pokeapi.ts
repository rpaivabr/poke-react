import Axios from "axios";
import { PokemonData } from "./Api";

const http = Axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export interface PokeApiSearchData {
  count: number;
  next: string;
  previous: string;
  results: PokeApiResult[];
}

export interface PokeApiResult {
  name: string;
}

export interface PokeApiData {
  name: string;
  id: number;
  order: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export const getPokemons = async (
  limit: number = 151
): Promise<PokeApiResult[]> => {
  const { data } = await http.get<PokeApiSearchData>(`/pokemon?limit=${limit}`);

  return data.results;
};

export const getPokemonByName = async (
  pokemonName: string
): Promise<PokemonData> => {
  const { data } = await http.get<PokeApiData>(`/pokemon/${pokemonName}`);

  const { sprites, types: apiTypes, id: order, name } = data;
  const imageUrl = sprites.other["official-artwork"].front_default;
  const types = apiTypes.map((t) => t.type.name);
  return { imageUrl, types, order, name } as PokemonData;
};
