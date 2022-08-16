import { Box } from "@mui/material";
import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const Header = () => {
  return <Box sx={{ borderBottom: 3, borderColor:'#ccc', py:5, px:4, textAlign:"right" }} >
    <FormControl variant="standard"  sx={{width:80}}>
                  <InputLabel id="demo-simple-select-label">English</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem value="">English</MenuItem>
                    <MenuItem value="">Chinese</MenuItem>
                    
                  </Select>
                </FormControl>
  </Box>;
};

export default Header;
