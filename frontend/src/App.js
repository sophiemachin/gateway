import React from 'react';
import './App.css';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import {makeStyles, Typography as T} from "@material-ui/core";
import users from "./data/users";

const useStyles = makeStyles(theme => ({
  root: {
  },
  card: {
    maxWidth: '300px',
    margin:'auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  form: {
    margin: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    align: 'center',
  },
  input : {
    margin: theme.spacing(2),
  },
  button : {
    margin: theme.spacing(2),
  },
}));


function App(props) {

  const { history } = props
  const classes = useStyles();

  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onChangeUsername(username) {
    setUserName(username)
  }

  function onChangePassword(password) {
    setPassword(password)
  }

  //This is not a secure login form
  function onClick() {
    const user = users.filter(user => user.username.toLowerCase() === username.toLowerCase())[0];
    if (user !== undefined) {
      if (user.password === password) {
        history.push(`/users/${user.id}/patients`)
      }
    }

  }


  return (
    <div className="App" >
      <div className={classes.root}>

      <Card className={classes.card}>
        <Button href='/#/users'>Go to admin page</Button>
      </Card>

      <Card className={classes.card}>
        <div className={classes.form}>

        <Input
          className={classes.input}
          placeholder="Username"
          onChange={e => onChangeUsername(e.target.value)}
        />
        <Input
          className={classes.input}
          placeholder="Password"
          onChange={e => onChangePassword(e.target.value)}
          type='password'
        />
        <Button onClick={onClick} variant='outlined' className={classes.button}>
          Login
        </Button>
          <T variant='caption'>Note: This login is not secure - it is for demo pourposes only</T>
        </div>
      </Card>
      </div>
    </div>
  );
}

export default App;
