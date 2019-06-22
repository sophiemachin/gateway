import samples from '../data/samples.json';

const samplesConfig = {
  rows : samples,
  headRows : [
    { id: 'id', label: 'id' },
    { id: 'patientId', label: 'patientId' },
    { id: 'sampleType', label: 'sampleType' },
    { id: 'date', label: 'date' },
    { id: 'quality', label: 'quality' },
  ],
  title: 'Samples',
};

export default samplesConfig