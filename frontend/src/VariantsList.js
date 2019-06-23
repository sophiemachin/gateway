import React from 'react';
import {makeStyles, Typography as T} from "@material-ui/core";
import Card from "@material-ui/core/Card";


const useCardStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
}));



export default function EnhancedTable() {
  const classes = useCardStyles()
  return (
    <div style={{display:'flex'}}>
      <Card className={classes.card}><T>Not implemented</T></Card>
    </div>
  );
}