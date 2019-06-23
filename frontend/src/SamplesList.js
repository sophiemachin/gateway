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
import {desc, stableSort, getSorting } from './tableHelper.js'
import Card from "@material-ui/core/Card";
import {CardContent, Typography as T} from "@material-ui/core";
import users from "./data/users";
import patients from "./data/patients";
import samples from './data/samples.json';
import {getDrName, getPatientName} from "./formattingHelpers";

function filterData (rows, patientId) {
  return samples.filter(sample => {
      if (sample.patientId.toString() === patientId.toString()) return sample;
    }
  )
}

function getBreadCrumbs ({userId, patientId}) {
  const user = users.filter(user => user.id.toString() === userId.toString())[0];
  const patient = patients.filter(patient => patient.id.toString() === patientId.toString())[0];
  return getDrName(user) + ' › ' + getPatientName(patient)
}

const useCardStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    boxShadow: 'none',
  },
}));

const PageInfo = ({ids}) => {
  const classes = useCardStyles();
  return <Card className={classes.card}>
    <CardContent>
      <T variant='body1'>Samples: </T>
      <T>userId: {ids.userId}</T>
      <T>patientId: {ids.patientId}</T>
    </CardContent>
  </Card>
};

const headRows = [
  { id: 'id', label: 'Sample id' },
  { id: 'sampleType', label: 'Sample type' },
  { id: 'date', label: 'Date' },
  { id: 'quality', label: 'Quality' },
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

  const rows = filterData(samples, ids.patientId);

  const classes = useStyles();
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
      history.push(props.location.pathname + '/' + id + '/variants')
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar headrows={headRows}
                              title={getBreadCrumbs(ids) + ' › samples'}
                              ids={ids}
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