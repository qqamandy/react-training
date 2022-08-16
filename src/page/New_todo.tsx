import React from "react";
import { Container, Box } from "@mui/system";
import { Button, Typography, TextField, Input } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { TodoList } from "../modules";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import axios from "axios";

const New_todo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoList>({
    defaultValues: {
      id: uuidv4(),
      name: "",
      description: "",
      createdAt: new Date().toISOString(),
      items: [],
      updatedAt: undefined,
    },
  });


  return (
    <Container
      maxWidth="md"
      component="form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        //NOTE API發不出去
        axios.post('/api/todoList/',{
          name: data.name,
          description: data.description
        })
      })}
    >
      {/* <New_todo_title/> */}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon
            fontSize="large"
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography variant="h4">New TODO</Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ color: "#fff" }}
        >
          Save
        </Button>
      </Box>

      <Box sx={{ backgroundColor: "#fff", p: 7 }}>
        {/* <New_todo_body /> */}
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
            id="outlined-basic"
            label="title"
            variant="outlined"
            {...register("name", {
              maxLength: { value: 16, message: "Min length is 16." },
              required: "Title is required.",
            })}
          />
          <Typography component="p" sx={{ color: "red" }}>
            {errors.name?.message}
          </Typography>
          <TextField
            sx={{ mt: 4 }}
            id="outlined-basic"
            label="description"
            variant="outlined"
            {...register("description")}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default New_todo;
