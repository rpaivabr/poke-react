import { deletePokemon, listAllPokemons } from "../services/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { PokemonData } from "../services/Api";
import Button from "@mui/material/Button";
import { useSnackbar } from "../services/Snackbar";

export function List() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [myPokemons, setMyPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    getMyPokemons();
  }, []);

  const getMyPokemons = async () => {
    setMyPokemons(await listAllPokemons());
  };

  const navigateTo = (param: number | string) => {
    const id = String(param);
    navigate(`/detail/${id}`, { replace: false });
  };

  const removePokemon = async (id: number) => {
    console.log(id);
    try {
      await deletePokemon(id);
      getMyPokemons();
      showSnackbar("Pokémon removed");
    } catch (err) {
      console.error(err);
      showSnackbar("Error, try again later");
    }
  };

  return (
    <div className="container">
      {!!myPokemons.length &&
        myPokemons.map((pokemon: PokemonData) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            actions
            onEdit={navigateTo}
            onDelete={removePokemon}
          />
        ))}
      {myPokemons.length < 6 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigateTo("select")}
        >
          Select new
        </Button>
      )}
    </div>
  );
}
