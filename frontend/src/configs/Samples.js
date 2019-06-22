import samples from '../data/samples.json';


function filterData (userId, patientId) {
  return samples
}

const samplesConfig = {
  rows : samples,
  headRows : [
    { id: 'id', label: 'id' },
    { id: 'patientId', label: 'patientId' },
    { id: 'sampleType', label: 'sampleType' },
    { id: 'date', label: 'date' },
    { id: 'quality', label: 'quality' },
  ],
  title: userId => 'Samples for ' + userId,
  filterData: filterData,
};

export default samplesConfig