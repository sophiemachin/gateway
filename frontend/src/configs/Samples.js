import samples from '../data/samples.json';
import patients from '../data/patients.json';
import users from '../data/users.json';
import {getDrName, getPatientName} from '../formattingHelpers.js'

function filterData (patientId) {
  return samples.filter(sample => {
      if (sample.patientId.toString() === patientId.toString()) return sample;
    }
  )
}

function getBreadCrumbs (userId, patientId) {
  const user = users.filter(user => user.id.toString() === userId.toString())[0];
  const patient = patients.filter(patient => patient.id.toString() === patientId.toString())[0];
  return getDrName(user) + ' › ' + getPatientName(patient)
}


const samplesConfig = {
  rows : samples,
  headRows : [
    { id: 'id', label: 'Sample id' },
    { id: 'sampleType', label: 'Sample type' },
    { id: 'date', label: 'Date' },
    { id: 'quality', label: 'Quality' },
  ],
  title: (userId, patientId) => getBreadCrumbs(userId, patientId) + ' › samples',
  filterData: filterData,
  navDown: '/variants'
};

export default samplesConfig