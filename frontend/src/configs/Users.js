import users from '../data/users.json';

const usersConfig = {
  rows : users,
  headRows : [
    { id: 'id', label: 'id' },
    { id: 'username', label: 'username' },
    { id: 'title', label: 'title' },
    { id: 'firstname', label: 'firstname' },
    { id: 'lastname', label: 'lastname' },
  ],
  title: 'Users',
};

export default usersConfig