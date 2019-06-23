import React from 'react';
import {makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { title, onChange, type, select} = props;

  let control = <Input placeholder="Search" onChange={e => onChange(e.target.value)}/>
  if (type ==='select') {
    control = <FormControl className={classes.formControl}>
      <InputLabel htmlFor="sample-type">Show</InputLabel>
      <Select
        value={select}
        onChange={e => onChange(e.target.value)}
        inputProps={{
          name: 'Sample type',
          id: 'sample-type',
        }}
      >
        <MenuItem value={'all'}>Show all</MenuItem>
        <MenuItem value={'TUMOUR'}>Tumour</MenuItem>
        <MenuItem value={'BLOOD_NORMAL'}>Blood</MenuItem>
        <MenuItem value={'CIRCULATING_DNA'}>DNA</MenuItem>
      </Select>
    </FormControl>
  }

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
       {control}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
};

export default EnhancedTableToolbar