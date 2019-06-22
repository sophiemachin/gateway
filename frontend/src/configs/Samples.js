import samples from '../data/samples.json';


function filterData (patientId) {
  return samples.filter(sample => {
      if (sample.patientId.toString() === patientId.toString()) return sample;
    }
  )
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
  navDown: '/variants'
};

export default samplesConfig