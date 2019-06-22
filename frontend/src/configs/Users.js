import users from '../data/users.json';


function filterData (userId) {
  return users
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
  title: 'Users',
  filterData: filterData,
};

export default usersConfig