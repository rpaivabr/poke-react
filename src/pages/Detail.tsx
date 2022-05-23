import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createPokemon, getPokemonById, PokemonData, updatePokemon } from "../services/Api";
import { Card } from "../components/Card";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import {
  getPokemonByName,
  getPokemons,
  PokeApiResult,
} from "../services/Pokeapi";
import { useSnackbar } from "../services/Snackbar";

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonSelected, setPokemonSelected] = useState<PokemonData>();
  const [pokemonList, setPokemonList] = useState<PokeApiResult[]>([]);

  useEffect(() => {
    getPokemonList();
    getMyPokemonSelected();
  }, []);

  const getPokemonList = async () => {
    setPokemonList(await getPokemons());
  };

  const getMyPokemonSelected = async () => {
    try {
      if (id === "select") return;

      const param = Number(id);
      if (isNaN(param)) {
        redirectToNotFound();
        return;
      }

      const pokemon = await getPokemonById(Number(id));
      setPokemonSelected(pokemon);
      setPokemonName(pokemon.name);
    } catch (err) {
      console.error(err);
      redirectToNotFound();
    }
  };

  const getPokemonSelected = async (name: string) => {
    const pokemon = await getPokemonByName(name);
    setPokemonSelected(pokemon);
    setPokemonName(pokemon.name);
  };

  const redirectToList = () => navigate(`/list`, { replace: false });

  const redirectToNotFound = () => navigate(`/404`, { replace: false });

  const handleSelect = (e: SelectChangeEvent) => {
    const name = e.target.value;
    getPokemonSelected(name);
  };

  const save = async () => {
    const savePokemon = id && id !== 'select'
      ? () => updatePokemon({ id: Number(id), ...pokemonSelected! })
      : () => createPokemon(pokemonSelected!);

      try {
        await savePokemon();
        showSnackbar('Pokémon added');
        redirectToList();
      } catch (err) {
        console.error(err);
        showSnackbar("Error, try again later");
        redirectToList();
      }
  };

  return (
    <div className="container column">
      <FormControl variant="filled" className="field">
        <InputLabel>Pokémon Name</InputLabel>
        <Select value={pokemonName} onChange={handleSelect}>
          {pokemonList.map(({ name }) => (
            <MenuItem value={name} key={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {pokemonSelected && <Card pokemon={pokemonSelected} />}

      <Button variant="contained" color="secondary" onClick={save}>
        Select new
      </Button>
    </div>
  );
}
