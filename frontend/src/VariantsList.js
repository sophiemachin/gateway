import React from 'react';
import { CardContent, makeStyles, Typography as T } from '@material-ui/core'
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import {getDrName, getPatientName} from "./formattingHelpers";

import users from "./data/users";
import patients from "./data/patients";
import HeaderBar from "./HeaderBar";
import variants from './data/variants'
import samples from './data/samples'
import Paper from '@material-ui/core/Paper'
import EnhancedTableToolbar from './table/EnTableToolbar'
import Table from '@material-ui/core/Table'
import EnhancedTableHead from './table/EnTableHead'
import TableBody from '@material-ui/core/TableBody'
import { getSorting, stableSort } from './tableHelper'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'


function getUser(userId){
  return users.filter(user => user.id.toString() === userId.toString())[0];
}

function getPatient(patientId){
  return patients.filter(p => p.id.toString() === patientId.toString())[0];
}

function getSample(sampleId){
  return samples.filter(s => s.id.toString() === sampleId.toString())[0];
}

function getSampleType(sampleType) {
  if (sampleType === 'TUMOUR') return 'Tumour'
  if (sampleType === 'CIRCULATING_DNA') return 'Circulating DNA'
  if (sampleType === 'BLOOD_NORMAL') return 'Blood normal'
  return 'Sample'
}

function filterData (rows, sampleId, searchText) {
  const filteredToPatient = rows.filter(variant => {
      if (variant.sampleId.toString() === sampleId.toString()) return variant;
    }
  );
  return filteredToPatient.filter(variant => {
    const toSearch = variant.geneName + ' ' + variant.mutationType + ' ' + variant.reference_base  + ' ' + variant.alternativeBase;
    if (searchText === 'all' || searchText === '' ||searchText === undefined ) return true;
    return toSearch.toLowerCase().includes(searchText.toLowerCase())
  })
}


export function formatCell (v, formatter, row) {
  if (formatter === undefined) return v
  return formatter(v, row)
}

const useCardStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    // display: 'flex',
  },
  card: {
    padding: theme.spacing(2),
    // margin: 'auto',
    // marginTop: theme.spacing(5),
    boxShadow: 'none',
  },
  content: {
    display: 'flex',
  }
}));

const PageInfo = ({ids, variants, severe, moderate, benign}) => {
  const classes = useCardStyles();
  return <Card className={classes.card}>
    <CardContent>
      <T variant='body1'>Total variants: {variants}</T>
      <T variant='body1'>Severe: {severe}</T>
      <T variant='body1'>Moderate: {moderate}</T>
      <T variant='body1'>Benign: {benign}</T>

    </CardContent>
  </Card>
};

function convertDec(v) {
  return Math.round(v * 100) / 100
}

const headRows = [
  { id: 'reference_base', label: 'Reference base' },
  { id: 'alternativeBase', label: 'Alternative base' },
  { id: 'geneName', label: 'Gene name' },
  { id: 'position', label: 'Position' },
  { id: 'mutationType', label: 'Mutation Type' },
  { id: 'alleleFrequency', label: 'Allele Frequency', formatter : convertDec},

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
  high : {
    color: 'green',
  },
  medium : {
    color: 'orange',
  },
  low : {
    color: 'red',
  },
  noVariants : {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  }
}));

export default function EnhancedTable(props) {
  const {ids, history } = props;

  const filtered = filterData(variants, ids.sampleId, undefined);

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
    setRows(filterData(filtered, ids.sampleId, searchText))
  }


  if (filtered.length === 0) {
    return <div>
      <HeaderBar history={history}/>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              headrows={headRows}
              title={
                <div>
                  <Link onClick={() =>
                    history.push(`/users/${ids.userId}/patients`)}
                        style={{cursor:'pointer'}}>
                    {getDrName(getUser(ids.userId))}
                  </Link> › <Link onClick={() =>
                  history.push(
                    `/users/${ids.userId}/patients/${ids.patientId}/samples`)}
                                  style={{cursor:'pointer'}}>
                  {getPatientName(getPatient(ids.patientId))}
                </Link> › Sample {ids.sampleId} (
                  {getSampleType(getSample(ids.sampleId).sampleType)}) variants
                </div>
              }
              ids={ids}
              onChange={onSearchChange}
              select={select}
            />
            <T className={classes.noVariants}>This sample has no variants</T>
          </Paper>
        </div>
      </div>
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
              <Link onClick={() =>
                history.push(`/users/${ids.userId}/patients`)}
                    style={{cursor:'pointer'}}>
                {getDrName(getUser(ids.userId))}
              </Link> › <Link onClick={() =>
              history.push(
                `/users/${ids.userId}/patients/${ids.patientId}/samples`)}
                              style={{cursor:'pointer'}}>
              {getPatientName(getPatient(ids.patientId))}
            </Link> › Sample {ids.sampleId} (
              {getSampleType(getSample(ids.sampleId).sampleType)}) variants
            </div>
          }
          ids={ids}
          onChange={onSearchChange}
          select={select}
        />
        <PageInfo
          ids={ids}
          variants={filtered.length}

          severe={filtered.filter(s => s.mutationType==='severe').length}
          moderate={filtered.filter(s => s.mutationType==='moderate_risk').length}
          benign={filtered.filter(s => s.mutationType==='benign').length}
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
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      className={classes.row}
                    >
                      {headRows.map(col => {
                          return <TableCell key={col.id}>
                           {formatCell(row[col.id], col.formatter, row)}
                          </TableCell>
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
