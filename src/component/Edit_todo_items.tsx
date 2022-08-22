import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/system";
import { Priority } from "../modules";
import { useForm } from "react-hook-form";
import { TodoListItem } from "../modules";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

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

const schema = yup.object().shape({
  name: yup.string(),
  priority: yup.string(),
});

const Edit_todo_items = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodoListItem>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        //NOTE API發不出去
        await axios.post(`/api/todoList/${data.id}/items`, {
          id: data.id,
          name: data.name,
          priority: data.priority,
        });
        setOpen(false)
      })}
    >
      {/* item & plus icon */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ mr: 17 }}>
          {t("edit_todo_item_add")}
        </Typography>
        <AddCircleIcon
          onClick={() => {
            setOpen(true);
          }}
        />
      </Box>

      {/* table */}
      {/* //NOTE 要再修 */}
      {open == true && (
        <Root sx={{ width: 500, maxWidth: "100%" }}>
          <table aria-label="custom pagination table">
            <thead>
              <tr>
                <th>{t("edit_todo_item_name")}</th>
                <th>{t("edit_todo_item_priority")}</th>
                <th>
                  {t("edit_todo_item_save")}/ {t("edit_todo_item_delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField
                    id="standard-basic"
                    label={t("edit_todo_item_name")}
                    variant="standard"
                    {...register("name")}
                  />
                </td>
                <td style={{ width: 120 }} align="right">
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("edit_todo_item_priority")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...register("priority")}
                    >
                      <MenuItem value={Priority.HIGH}>
                        {t("edit_todo_item_priority_high")}
                      </MenuItem>
                      <MenuItem value={Priority.MEDIUM}>
                        {t("edit_todo_item_priority_medium")}
                      </MenuItem>
                      <MenuItem value={Priority.LOW}>
                        {t("edit_todo_item_priority_low")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td style={{ width: 100 }} align="right">
                  <button
                    style={{ marginLeft: 6 }}
                    type="submit"
                    
                  >
                    <SaveIcon />
                  </button>
                  <button
                    style={{ marginLeft: 6 }}
                    type="button"
                    onClick={() => {
                      setValue("name", "");
                      setOpen(false);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Root>
      )}
    </Box>
  );
};

export default Edit_todo_items;
