import React from 'react';
import './App.css';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";

function App() {

  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onChangeUsername(username) {
    setUserName(username)
  }

  function onChangePassword(password) {
    setPassword(password)
  }

  return (
    <div className="App">

      This is the home page

      <Card>
        <Button href='/#/users'>Go to admin page</Button>
      </Card>

      <Card>

        <Input
          placeholder="Username"
          onChange={e => onChangeUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          onChange={e => onChangePassword(e.target.value)}
          type='password'
        />
        <Button href='/#/users'>Go to admin page</Button>
      </Card>
    </div>
  );
}

export default App;
