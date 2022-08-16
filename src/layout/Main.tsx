import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit_todo from "../page/Edit_todo";
import New_todo from "../page/New_todo";




const Main = () => {
  return (
    <Box sx={{ backgroundColor: "#E9E9E9", py: 9,minHeight:590 }}>
      <Routes>
        <Route path="/editTodo" element={<Edit_todo/>} />
        <Route path="/newTodo" element={<New_todo/>}/>
      </Routes>
      
    </Box>
  );
};

export default Main;
