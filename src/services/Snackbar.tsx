import Snackbar from "@mui/material/Snackbar";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarContextActions {
  showSnackbar: (text: string) => void;
}

interface SnackbarContextProviderProps {
  children: ReactNode;
}

const SnackbarContext = createContext({} as SnackbarContextActions);

export function SnackbarProvider({ children }: SnackbarContextProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const showSnackbar = (text: string) => {
    setMessage(text);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setOpen(false)}
        message={message}
      />
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextActions {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within an SnackbarProvider');
  }

  return context;
};
