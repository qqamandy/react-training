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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

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

interface ItemResponse {
  id: number;
}

interface itemParameter {
  id: string | undefined;
  name: string;
  priority: string;
}

const Edit_todo_items = () => {
  //post完後自動fetch新資料
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(["getItem"]);

  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodoListItem>({
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const [open, setOpen] = useState(false);

  //get item
  const { data, refetch } = useQuery("getItem", () =>
    axios.get(`http://localhost:3001/api/todoList/${id}`)
  );
  // console.log(data)

  const itemsData = data?.data.items;
  console.log(itemsData);

  //post item
  const postTodoItem = useMutation<ItemResponse, unknown, itemParameter>(
    (newItem) => {
      const correctType: Promise<ItemResponse> =
        null as unknown as Promise<ItemResponse>;
      const promise = axios
        .post<ItemResponse>(
          `http://localhost:3001/api/todoList/${id}/items`,
          newItem
        )
        .then((resp) => resp.data);
      return promise;
    }
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        postTodoItem.mutate({
          id: id,
          name: data.name,
          priority: data.priority || "",
        });
        setValue("name", "");
        refetch();
        setOpen(false);
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
      {itemsData?.length > 0 ? (
        itemsData?.map((item) => {
          return (
            <Root sx={{ width: 500, maxWidth: "100%" }} key={item.id}>
              <table aria-label="custom pagination table">
                <thead>
                  <tr>
                    <th>{t("edit_todo_item_name")}</th>
                    <th>{t("edit_todo_item_priority")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.name}</td>
                    <td style={{ width: 120, height: 60 }} align="right">
                      {item.priority}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Root>
          );
        })
      ) : (
        <Box></Box>
      )}

      {/* toggle table */}
      {open == true && (
        <Root sx={{ width: 500, maxWidth: "100%", mt: 5 }}>
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
                  <button style={{ marginLeft: 6 }} type="submit">
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
