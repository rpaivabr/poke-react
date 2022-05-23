import Axios from "axios";

const http = Axios.create({
  baseURL: "http://localhost:3334",
});

export interface PokemonData {
  id?: number;
  name: string;
  order: number;
  imageUrl: string;
  types: string[];
}

export const listAllPokemons = async (): Promise<PokemonData[]> => {
  return (await http.get<PokemonData[]>("/pokemons")).data;
};

export const getPokemonById = async (id: number): Promise<PokemonData> => {
  return (await http.get<PokemonData>(`/pokemons/${id}`)).data;
};

export const createPokemon = async (
  pokemon: PokemonData
): Promise<PokemonData> => {
  return (await http.post<PokemonData>("/pokemons", pokemon)).data;
};

export const updatePokemon = async (
  pokemon: PokemonData
): Promise<PokemonData> => {
  return (await http.put<PokemonData>(`/pokemons/${pokemon.id}`, pokemon)).data;
};

export const deletePokemon = async (id: number): Promise<void> => {
  return (await http.delete<void>(`/pokemons/${id}`)).data;
};
