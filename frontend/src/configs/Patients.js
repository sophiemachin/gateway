import patients from '../data/patients.json';
import users from '../data/users.json';
import {getDrName} from "../formattingHelpers";
import React from "react";
import {CardContent, makeStyles, Typography as T} from "@material-ui/core";
import Card from "@material-ui/core/Card";

function filterData ({userId}) {
  return patients.filter(patient => {
    if (patient.userId.toString() === userId.toString()) return patient;
  }
)
}

function getUser(userId){
  return users.filter(user => user.id.toString() === userId.toString())[0];
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
}

const patientsConfig = {
  rows : patients,
  headRows : [
      { id: 'id', label: 'id' },
      { id: 'firstname', label: 'First name' },
      { id: 'lastname', label: 'Last name' },
      { id: 'gender', label: 'Gender' },
      { id: 'dateOfBirth', label: 'Date of Birth' },
  ],
  title: ids => getUserName(ids) + ' › patients',
  filterData: filterData,
  navDown: '/samples',
  PageInfo : PageInfo,
};

export default patientsConfig