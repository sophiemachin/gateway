import React from 'react';
import {makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { title, userId, patientId, sampleId } = props;
  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title(userId, patientId, sampleId)}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Input />
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
};

export default EnhancedTableToolbar