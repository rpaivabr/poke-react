import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { SnackbarProvider } from "./services/Snackbar";

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Header />
        <Outlet />
      </SnackbarProvider>
    </div>
  );
}

export default App;
