
import patients from '../data/patients.json';

const patientsConfig = {
  rows : patients,
  headRows : [
      { id: 'id', label: 'id' },
      { id: 'firstname', label: 'First name' },
      { id: 'lastname', label: 'Last name' },
      { id: 'gender', label: 'Gender' },
      { id: 'dateOfBirth', label: 'Date of Birth' },
  ],
  title: 'Patients'
};

export default patientsConfig