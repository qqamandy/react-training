import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { TodoListSummary } from "../modules";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";


//Table 樣式設定
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const Home_body = () => {
  const { t, i18n } = useTranslation();
  const { data, status, isLoading, isError, isSuccess } = useQuery(
    "getTodoSummary",
    () => axios.get("http://localhost:3001/api/todoList")
  );

  console.log(status, isLoading, isError, isSuccess, data)
  const homeData = data?.data;
  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("home_body_title")}</StyledTableCell>
            <StyledTableCell align="left">
              {t("home_body_create_at")}
            </StyledTableCell>
            <StyledTableCell align="left">
              {t("home_body_description")}
            </StyledTableCell>
            <StyledTableCell align="left">
              {t("home_body_detail_count")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeData?.map((homeData) => (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" onClick={()=>{navigate(`/main/editTodo/${homeData.id}`)}}>
              {homeData.name}
            </TableCell>
            <TableCell align="left">{homeData.createdAt}</TableCell>
            <TableCell align="left">{homeData.description}</TableCell>
            <TableCell align="left">{homeData.numberOfItems}</TableCell>
          </TableRow>
           ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home_body;
