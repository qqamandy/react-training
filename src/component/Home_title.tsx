import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Title = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}>
      <Typography variant="h4">{t('home_title_title')}</Typography>
      <Button variant="contained" color="secondary" style={{ color: "#fff" }}
      onClick={()=>{navigate('/main/Newtodo')}}>
        {t('home_title_button')}
      </Button>
    </Box>
  );
};

export default Title;
