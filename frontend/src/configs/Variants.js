import variants from '../data/variants.json';


function filterData (userId, patientId) {
  return variants
}

const usersConfig = {
  rows : variants,
  headRows : [
    { id: 'id', label: 'id' },
    { id: 'sampleId', label: 'sampleId' },
    { id: 'reference_base', label: 'reference_base' },
    { id: 'alternativeBase', label: 'alternativeBase' },
    { id: 'geneName', label: 'geneName' },
    { id: 'position', label: 'position' },
    { id: 'mutationType', label: 'mutationType' },
    { id: 'alleleFrequency', label: 'alleleFrequency' },
  ],
  title: userId => 'Variants for ' + userId,
  filterData: filterData,
};

export default usersConfig