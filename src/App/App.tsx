import "./App.scss";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import { store } from "@/Shared/Model";
import { Box } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Box display="grid" gridTemplateRows="auto 1fr auto" minHeight={"100vh"}>
        <RouterProvider router={router} />
      </Box>
    </Provider>
  );
}

export default App;
