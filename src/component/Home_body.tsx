import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import { TodoListSummary } from "../modules";
import { useTranslation } from "react-i18next";

//Table 樣式設定
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const Home_body = () => {
  const [TodoListSummary, setTodoListSummary] = useState<TodoListSummary>();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    //axios抓資料
    let getTodoListSummary = () => {
      axios.get("/api/todoList").then((res) => {
        console.log(res.data);
      });
    };
    getTodoListSummary();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("home_body_title")}</StyledTableCell>
            <StyledTableCell align="left">{t("home_body_create_at")}</StyledTableCell>
            <StyledTableCell align="left">{t("home_body_description")}</StyledTableCell>
            <StyledTableCell align="left">{t("home_body_detail_count")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {1}
            </TableCell>
            <TableCell align="left">{1}</TableCell>
            <TableCell align="left">{2}</TableCell>
            <TableCell align="left">{1}</TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home_body;
