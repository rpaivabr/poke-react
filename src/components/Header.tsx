import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar color="primary">
        <Link to="/list">
          <Typography variant="h6" component="div">
            My Pokémons
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
