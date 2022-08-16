import React from "react";
import { Container, Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Typography, TextField } from "@mui/material";
import Edit_todo_items from "../component/Edit_todo_items";

const Edit_todo = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          mb: 6,
        }}
      >
        <ArrowBackIcon
          fontSize="large"
          onClick={() => {
            navigate("/");
          }}
        />
        <Typography variant="h4">Edit TODO</Typography>
      </Box>
      <Box sx={{ backgroundColor: "#fff", p: 7 }}>
        {/* <Edit_todo_body /> */}
        <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h5" sx={{ mb: 4 }}>
        Basic info
      </Typography>

      <TextField
        disabled
        sx={{ mb: 4 }}
        id="outlined-basic"
        label="Title"
        variant="outlined"
      />
      <TextField
        disabled
        sx={{ mb: 4 }}
        id="outlined-basic"
        label="Description"
        variant="outlined"
      />

      {/* items */}
      <Edit_todo_items />
    </Box>
      </Box>
    </Container>
  );
};

export default Edit_todo;
