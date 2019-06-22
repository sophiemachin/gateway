import variants from '../data/variants.json';
import React from "react";



function filterData (sampleId) {
  return variants.filter(variant => {
      if (variant.sampleId.toString() === sampleId.toString()) return variant;
    }
  )
}

function PageInfo () {
  return <div> page info </div>
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
  navDown: undefined,
  PageInfo : PageInfo,
};

export default usersConfig