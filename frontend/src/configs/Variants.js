import variants from '../data/variants.json';

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
  title: 'Variants',
};

export default usersConfig