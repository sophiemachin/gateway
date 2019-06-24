import React from 'react';
import {makeStyles, Typography as T} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import {getDrName, getPatientName} from "./formattingHelpers";

import users from "./data/users";
import patients from "./data/patients";
import HeaderBar from "./HeaderBar";


function getUser(userId){
  return users.filter(user => user.id.toString() === userId.toString())[0];
}

function getPatient(patientId){
  return patients.filter(p => p.id.toString() === patientId.toString())[0];
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
  },
  content: {
    display: 'flex',
  }
}));



export default function EnhancedTable(props) {
  const { ids, history } = props
  const classes = useCardStyles()
  return (
    <div>
    <HeaderBar history={history} />
    <div className={classes.root}>


      <Card className={classes.card}>
        <T variant="h6">
        <div>
          <Link href={`/#/users/${ids.userId}/patients`}>
            {getDrName(getUser(ids.userId))}
          </Link> › <Link href={`/#/users/${ids.userId}/patients/${ids.patientId}/samples`}>
          {getPatientName(getPatient(ids.patientId))}
        </Link> › variants
        </div>
        </T>

        <div className={classes.content}>
          <T>Not implemented</T>
        </div>
      </Card>
    </div>
    </div>
  );
}