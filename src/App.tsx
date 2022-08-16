import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Main from "./layout/Main";
import {  createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Home from "./page/Home";
import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
});

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
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main/*" element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
