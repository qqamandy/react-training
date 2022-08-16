import React from "react";
import { Container, Box } from "@mui/system";
import Title from "../component/Home_title";
import Home_body from "../component/Home_body";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#E9E9E9", py: 9, minHeight:590}}>
         <Container maxWidth="md">
      <Title />
        <Box sx={{ backgroundColor: "#fff" }}>
            <Home_body />
        </Box>
    </Container>
    </Box>
   
  );
};

export default Home;
