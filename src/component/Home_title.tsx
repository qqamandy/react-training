import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";


const Title = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}>
      <Typography variant="h4">TODO List</Typography>
      <Button variant="contained" color="secondary" style={{ color: "#fff" }}
      onClick={()=>{navigate('/main/Newtodo')}}>
        New TODO
      </Button>
    </Box>
  );
};

export default Title;
