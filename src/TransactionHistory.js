import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const data = props.data;
  if (data == null) return null;
  debugger;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="right">
              #&nbsp;Transaction ID
            </StyledTableCell>
            <StyledTableCell align="right">
              $&nbsp;Transaction Amount
            </StyledTableCell>
            <StyledTableCell align="right">Transaction Date</StyledTableCell>
            <StyledTableCell align="right">Reward Poins</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((i) => (
            <StyledTableRow key={i.id}>
              <StyledTableCell component="th" scope="row">
                {i.meta.name}
              </StyledTableCell>
              <StyledTableCell align="right">{i.id}</StyledTableCell>
              <StyledTableCell align="right">{i.meta.cost}</StyledTableCell>
              <StyledTableCell align="right">{i.meta.date}</StyledTableCell>
              <StyledTableCell align="right">{i.meta.points}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}