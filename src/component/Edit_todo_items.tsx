import React from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from "@mui/system";
import { Priority } from "../modules";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

//table設計樣式
const Root = styled("div")(
  () => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #B9B9B9;
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: #E7EBF0;
  }
  `
);



const Edit_todo_items = () => {

  const {register, handleSubmit, formState:{errors}} =useForm({
    defaultValues:{
      listId: '',
      id: uuidv4(),
      name: '',
      priority: '',
      createdAt: new Date().toISOString(),
      updatedAt: undefined
    }
  })

  return (
    <Box component='form' onSubmit={handleSubmit((data)=>{
      console.log(data);
    })}>
      {/* item & plus icon */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ mr: 17 }}>
          Items
        </Typography>
        <AddCircleIcon />
      </Box>

      {/* table */}
      <Root sx={{ width: 500, maxWidth: "100%" }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Priority</th>
              <th>Save/ Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><TextField id="standard-basic" label="name" variant="standard"/></td>
              <td style={{ width: 120 }} align="right">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem value="">{Priority.HIGH}</MenuItem>
                    <MenuItem value="">{Priority.MEDIUM}</MenuItem>
                    <MenuItem value="">{Priority.LOW}</MenuItem>
                    
                  </Select>
                </FormControl>
              </td>
              <td style={{ width: 100 }} align="right">
                  <SaveIcon sx={{pl:2.5}}/>
                  <DeleteIcon sx={{pl:1.5}}/>
              </td>
            </tr>
          </tbody>
        </table>
      </Root>
    </Box>
  );
};

export default Edit_todo_items;
