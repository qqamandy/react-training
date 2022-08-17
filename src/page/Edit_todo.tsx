import React from "react";
import { Container, Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Typography, TextField } from "@mui/material";
import Edit_todo_items from "../component/Edit_todo_items";
import { useTranslation } from "react-i18next";

const Edit_todo = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

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
        <Typography variant="h4">{t("edit_todo_title_title")}</Typography>
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
        {t("new_todo_body_basic_info")}
      </Typography>

      <TextField
        disabled
        sx={{ mb: 4 }}
        id="outlined-basic"
        label={t("new_todo_body_title")}
        variant="outlined"
      />
      <TextField
        disabled
        sx={{ mb: 4 }}
        id="outlined-basic"
        label={t("new_todo_body_description")}
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
