import { Box } from "@mui/material";
import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import i18n from "../i18n/i18n";

const Header = () => {
const changeLanguage = (e)=>{
  switch(e.target.value){
    case "en":
      i18n.changeLanguage("en")
      break;

      case "zh":
        i18n.changeLanguage("zh")
        break;
  }
}

  return <Box sx={{ borderBottom: 3, borderColor:'#ccc', py:5, px:4, textAlign:"right" }} >
    <FormControl variant="standard"  sx={{width:100}}>
                  <InputLabel id="demo-simple-select-label">Language</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={changeLanguage}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="zh">Chinese</MenuItem>
                    
                  </Select>
                </FormControl>
  </Box>;
};

export default Header;
