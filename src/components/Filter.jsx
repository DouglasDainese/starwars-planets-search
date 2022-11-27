import React, { useContext, useState } from 'react';
import { PlanetsStarWarContext } from '../context/PlanetsStarWarProvider';

function Filter() {
  const [filterName, setFilterName] = useState('');
  const { dataApi, filters, setFilter } = useContext(PlanetsStarWarContext);

  const handleChange = ({ target }) => {
    setFilterName(target.value);
    setFilter({
      ...filters,
      filterName: dataApi.filter((planet) => planet.name.toLowerCase()
        .includes(target.value.toLowerCase())),
    });
  };

  return (
    <nav>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtre por nome"
        onChange={ (e) => handleChange(e) }
        value={ filterName }
      />
    </nav>
  );
}

export default Filter;
