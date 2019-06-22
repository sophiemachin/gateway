import patients from '../data/patients.json';
import users from '../data/users.json';

function filterData (userId) {
  return patients.filter(patient => {
    if (patient.userId.toString() === userId.toString()) return patient;
  }
)
}

function getUserName (userId) {
  const user = users.filter(user => user.id.toString() === userId.toString())[0];
  return user.title + ' ' +  user.firstname + ' ' + user.lastname
}

const patientsConfig = {
  rows : patients,
  headRows : [
      { id: 'id', label: 'id' },
      { id: 'firstname', label: 'First name' },
      { id: 'lastname', label: 'Last name' },
      { id: 'gender', label: 'Gender' },
      { id: 'dateOfBirth', label: 'Date of Birth' },
  ],
  title: userId => getUserName(userId) + ' › patients',
  filterData: filterData,
  navDown: '/samples'
};

export default patientsConfig