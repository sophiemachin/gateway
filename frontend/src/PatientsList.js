import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EnhancedTableHead from './table/EnTableHead.js'
import EnhancedTableToolbar from './table/EnTableToolbar.js'
import Card from "@material-ui/core/Card";
import {CardContent, Typography as T} from "@material-ui/core";
import patients from './data/patients.json';
import { stableSort, getSorting } from './tableHelper.js'
import users from "./data/users";
import {getDrName} from "./formattingHelpers";

function getUser(userId){
  return users.filter(user => user.id.toString() === userId.toString())[0];
}


function filterData (rows, userId, searchText) {
  const filteredToUser = rows.filter(patient => {
    if (patient.userId.toString() === userId.toString()) return patient;
  })
  return filteredToUser.filter(patient  => {
      if (searchText === undefined) return true;
      const toSearch = patient.username + ' ' + patient.firstname + ' ' + patient.lastname;
      return toSearch.toLowerCase().includes(searchText.toLowerCase())
    }
  )
}


function getUserName ({userId}) {
  return getDrName(getUser(userId))
}

const useCardStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    boxShadow: 'none',
  },
}));


const PageInfo = ({ids}) => {
  const { userId }= ids;
  const user = getUser(userId);
  const classes = useCardStyles();
  return <Card className={classes.card}>
    <CardContent>
      <T variant='body1'>Institute: {user.institute}</T>
      <T variant='body1'>Patients: {patients.length}</T>
    </CardContent>
  </Card>
};


const headRows =  [
  { id: 'id', label: 'id' },
  { id: 'firstname', label: 'First name' },
  { id: 'lastname', label: 'Last name' },
  { id: 'gender', label: 'Gender' },
  { id: 'dateOfBirth', label: 'Date of Birth' },
];

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

export default function EnhancedTable(props) {
  const {ids, history } = props;

  const filteredToUser = filterData(patients, ids.userId, undefined);

  const classes = useStyles();
  const [rows, setRows] = React.useState(filteredToUser);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }


  function handleClick(event, id) {
      history.push(props.location.pathname + '/' + id + '/samples')
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  function onSearchChange(searchText) {
    setRows(filterData(filteredToUser, ids.userId, searchText))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar headrows={headRows}
                              title={getUserName(ids) + ' › patients'}
                              ids={ids}
                              onChange={onSearchChange}
        />
        <PageInfo
          ids={ids}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headRows={headRows}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {headRows.map(col =>
                          <TableCell key={col.id}>{row[col.id]}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}