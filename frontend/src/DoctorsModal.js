import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EnhancedTableHead from './table/EnTableHead.js'
import { stableSort, getSorting } from './tableHelper.js'
import users from "./data/users";
import HeaderBar from "./HeaderBar";
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'

function filterData (rows, userId, searchText ) {
  return rows.filter(user  => {
    if (searchText === undefined) return true;
    const toSearch = user.username + ' ' + user.firstname + ' ' + user.lastname;
    return toSearch.toLowerCase().includes(searchText.toLowerCase())
    }
  )
}


const headRows = [
  { id: 'username', label: 'Username' },
  { id: 'title', label: 'Title' },
  { id: 'firstname', label: 'First Name' },
  { id: 'lastname', label: 'Last name' },
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
    // minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    cursor: 'pointer',
  }
}));

export default function EnhancedTable(props) {
  const {ids, history } = props;

  const filtered = filterData(users, ids);

  const [rows, setRows] = React.useState(filtered);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('lastname');

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }


  function handleClick(event, id) {
    history.push(props.location.pathname + '/' + id + '/patients')
  }

  return (
    <div>
    <HeaderBar history={history} />
    <Dialog open={true}>
      <div className={classes.root}>
        <Typography variant="h6" id="tableTitle">
          Admin page: choose a doctor to log in as
        </Typography>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
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
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      className={classes.row}
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
      </div>
    </Dialog>
    </div>
  );
}
