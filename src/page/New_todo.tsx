import React from "react";
import { Container, Box } from "@mui/system";
import { Button, Typography, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { TodoList } from "../modules";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";


const schema = yup.object().shape({
  name: yup.string().required().max(16),
  description: yup.string(),
});

interface todoParameter {
  name:string
  description: string
}

interface TodoResponse {
  id: number;
}


const New_todo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodoList>({
    resolver: yupResolver(schema),
  });
  const { t, i18n } = useTranslation();

  const postNewTodo = useMutation<TodoResponse, unknown, todoParameter>((newTodo) => {
    const correctType: Promise<TodoResponse> = null as unknown as Promise<TodoResponse>;
    const promise = axios.post<TodoResponse>("http://localhost:3001/api/todoList/", newTodo).then(resp => resp.data);
    setValue("name","");
    setValue("description","");
    return promise;
  });

  return (
    <Container
      maxWidth="md"
      component="form"
      // onSubmit={handleSubmit(
      //   async(data) => {
      //   console.log(data);
      //   //NOTE API發不出去
      //   await axios.post('/api/todoList/',{
      //     name: data.name,
      //     description: data.description
      //   })
      // })}

      onSubmit={handleSubmit((data) => {
        postNewTodo.mutate({ name: data.name, description: data.description || '' });
        console.log(data)
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
          <Typography variant="h4">{t("new_todo_title_title")}</Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ color: "#fff" }}
        >
          {t("new_todo_title_button")}
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
            {t("new_todo_body_basic_info")}
          </Typography>

          <TextField
            id="outlined-basic"
            label={t("new_todo_body_title")}
            variant="outlined"
            {...register("name")}
          />
          <Typography component="p" sx={{ color: "red" }}>
            {errors.name?.message}
          </Typography>
          <TextField
            sx={{ mt: 4 }}
            id="outlined-basic"
            label={t("new_todo_body_description")}
            variant="outlined"
            {...register("description")}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default New_todo;
