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
import { stableSort, getSorting } from './tableHelper.js'
import Card from "@material-ui/core/Card";
import {CardContent, Typography as T} from "@material-ui/core";
import users from "./data/users";
import patients from "./data/patients";
import samples from './data/samples.json';
import {getDrName, getPatientName} from "./formattingHelpers";
import Link from "@material-ui/core/Link";
import HeaderBar from "./HeaderBar";

function filterData (rows, patientId, searchText) {
  const filteredToPatient = samples.filter(sample => {
      if (sample.patientId.toString() === patientId.toString()) return sample;
    }
  );
  return filteredToPatient.filter(sample => {
    if (searchText === 'all' || searchText === '' ||searchText === undefined ) return true;
    return sample.sampleType.toLowerCase().includes(searchText.toLowerCase())
  })
}


function getUser(userId){
  return users.filter(user => user.id.toString() === userId.toString())[0];
}

function getPatient(patientId){
  return patients.filter(p => p.id.toString() === patientId.toString())[0];
}

const useCardStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    boxShadow: 'none',
  },
}));

const PageInfo = ({ids, samples, blood, dna, tumour}) => {
  const classes = useCardStyles();
  return <Card className={classes.card}>
    <CardContent>
      <T variant='body1'>Total samples: {samples}</T>
      <T variant='body1'><i className="fas fa-plus" style={{minWidth:'16px'}}/><i className="fas fa-plus" style={{minWidth:'20px'}}/> Tumour: {tumour}</T>
      <T variant='body1'><i className="fas fa-tint" style={{minWidth:'35px'}}/>  Normal blood: {blood}</T>
      <T variant='body1'><i className="fas fa-dna" style={{minWidth:'35px'}}/>  Circulating dna: {dna}</T>

    </CardContent>
  </Card>
};

function getIcon (cell) {
  if (cell === 'circulating_dna') return <i className="fas fa-dna"/>;
  if (cell === 'blood_normal') return <i className="fas fa-tint"/>;
  if (cell === 'tumour') return <div>
    <i className="fas fa-plus"style={{minWidth:'16px'}}/><i className="fas fa-plus"/></div>;

  return cell
}


function formatDateTime(d) {
  const date = new Date(d);
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  let hours = ((date.getHours() < 10) ? '0':'') +  date.getHours()
  let mins = ((date.getMinutes() < 10) ? '0':'') + date.getMinutes()

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + mins ;
}


const headRows = [
  { id: 'id', label: 'Sample id' },
  { id: 'sampleType', label: 'Sample type' },
  { id: 'date', label: 'Date and time' },
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
  row: {
    cursor: 'pointer',
  },
  high : {
    color: 'green',
  },
  medium : {
    color: 'orange',
  },
  low : {
    color: 'red',
  }
}));

export default function EnhancedTable(props) {
  const {ids, history } = props;

  const filtered = filterData(samples, ids.patientId, undefined);

  const classes = useStyles();
  const [select, setSelect] = React.useState('');
  const [rows, setRows] = React.useState(filtered);
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


  function onSelectChange(searchText) {
    setSelect(searchText)
    setRows(filterData(filtered, ids.patientId, searchText))
  }



  return (
    <div>
    <HeaderBar history={history} />
    <div className={classes.root}>

      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          headrows={headRows}
          title={
            <div>
            <Link onClick={() => history.push(`/users/${ids.userId}/patients`)}
                  style={{cursor:'pointer'}}>
              {getDrName(getUser(ids.userId))}
            </Link> › {getPatientName(getPatient(ids.patientId))}
            </div>
          }
          ids={ids}
          onChange={onSelectChange}
          type='select'
          select={select}
        />
        <PageInfo
          ids={ids}
          samples={filtered.length}
          tumour={filtered.filter(s => s.sampleType==='TUMOUR').length}
          dna={filtered.filter(s => s.sampleType==='CIRCULATING_DNA').length}
          blood={filtered.filter(s => s.sampleType==='BLOOD_NORMAL').length}
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
                  // console.log(row)

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      className={classes.row}
                    >
                      {headRows.map(col => {

                        let cell = row[col.id];

                        if (col.id === 'date') {
                          cell = formatDateTime(cell)
                        } else if (col.id === 'sampleType') {
                          cell = getIcon(row[col.id].toString().toLowerCase())
                        }


                          return <TableCell
                            key={col.id}
                            className={classes[cell]}
                          >{cell}</TableCell>
                      }

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
    </div>
  );
}
