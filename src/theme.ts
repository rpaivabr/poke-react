import { createTheme } from '@mui/material/styles';
import { indigo, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: indigo.A400,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;