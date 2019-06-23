import samples from '../data/samples.json';
import patients from '../data/patients.json';
import users from '../data/users.json';
import {getDrName, getPatientName} from '../formattingHelpers.js'
import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, makeStyles, Typography as T} from "@material-ui/core";

function filterData ({patientId}) {
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
}

const samplesConfig = {
  rows : samples,
  headRows : [
    { id: 'id', label: 'Sample id' },
    { id: 'sampleType', label: 'Sample type' },
    { id: 'date', label: 'Date' },
    { id: 'quality', label: 'Quality' },
  ],
  title: (ids) => getBreadCrumbs(ids) + ' › samples',
  filterData: filterData,
  navDown: '/variants',
  PageInfo : PageInfo,
};

export default samplesConfig