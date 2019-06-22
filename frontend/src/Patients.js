
import patients from './data/patients.json';

const patientsConfig = {
  rows : patients,
  headRows : [
      { id: 'id', label: 'id' },
      { id: 'username', label: 'username' },
      { id: 'title', label: 'title' },
      { id: 'firstname', label: 'firstname' },
      { id: 'lastname', label: 'lastname' },
  ],
  title: 'Patients'
};

export default patientsConfig