import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Main from "./layout/Main";
import {  createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Home from "./page/Home";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient()




const theme = createTheme({
  palette: {
    primary: {
      main: "#64C8B9",
    },
    secondary: {
      main: "#66A8C3",
    },
  },
});

function App() {
  return (
    <div className="App" >
          <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main/*" element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
          </QueryClientProvider>
    </div>
  );
}

export default App;
