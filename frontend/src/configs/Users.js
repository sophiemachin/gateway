import React from 'react';
import users from '../data/users.json';
import Card from "@material-ui/core/Card";
import {CardContent, makeStyles} from "@material-ui/core";


function filterData (userId) {
  return users
}
const useCardStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    boxShadow: 'none',
  },
}));

const PageInfo = () => {
  const classes = useCardStyles();
  return <Card className={classes.card}>
    <CardContent>
      Users: {users.length}
    </CardContent>
  </Card>
}

const usersConfig = {
  rows : users,
  headRows : [
    { id: 'id', label: 'id' },
    { id: 'username', label: 'Username' },
    { id: 'title', label: 'Title' },
    { id: 'firstname', label: 'First Name' },
    { id: 'lastname', label: 'Last name' },
  ],
  title: id => 'Admin page: Users',
  filterData: filterData,
  navDown: '/patients',
  PageInfo : PageInfo,
};

export default usersConfig