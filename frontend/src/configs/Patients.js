import patients from '../data/patients.json';


function filterData (userId) {
  return patients.filter(patient => {
    if (patient.userId.toString() === userId.toString()) return patient;
  }
)
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
  title: userId => 'Patients for ' + userId,
  filterData: filterData,
  navDown: '/samples'
};

export default patientsConfig