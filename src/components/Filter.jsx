import React, { useContext, useState, useEffect } from 'react';
import { PlanetsStarWarContext } from '../context/PlanetsStarWarProvider';

function Filter() {
  const [filterName, setFilterName] = useState('');
  const [filterNumber, setFilterNumber] = useState([]);
  const cleanInputs = {
    coluna: 'population',
    operador: 'maior que',
    valor: 0,
  };
  const [valueInputs, setValueInputs] = useState(cleanInputs);
  const { dataApi, setFilter } = useContext(PlanetsStarWarContext);

  useEffect(() => {
    const newfiltersname = (dataApi)
      .filter((planet) => planet.name.toLowerCase()
        .includes(filterName.toLowerCase()));
    const filtersNumbers = filterNumber.reduce((acc, filter) => (
      acc.filter((planeta) => {
        switch (filter.operador) {
        case 'maior que':
          console.log(`maior que ${planeta[filter.coluna]}`);
          return Number(planeta[filter.coluna]) > Number(filter.valor);
        case 'menor que':

          console.log(`menor que ${filter.coluna}`);
          return Number(planeta[filter.coluna]) < Number(filter.valor);
        case 'igual a':

          console.log(`igual ${planeta[filter.coluna]}`);
          return Number(planeta[filter.coluna]) === Number(filter.valor);
        default:
          return true;
        }
      })
    ), newfiltersname);
    setFilter(filtersNumbers);
  }, [filterName, filterNumber]);

  const handleChange = ({ target }) => {
    switch (target.name) {
    case 'filterName':
      setFilterName(target.value);
      break;
    default:
      setValueInputs({
        ...valueInputs,
        [target.name]: target.value,
      });
    }
  };

  const saveFilter = () => {
    setFilterNumber([...filterNumber, valueInputs]);
    setValueInputs(cleanInputs);
  };

  return (
    <form>
      <div>
        <input
          type="text"
          name="filterName"
          data-testid="name-filter"
          placeholder="Filtre por nome"
          onChange={ (e) => handleChange(e) }
          value={ filterName }
        />
      </div>
      <div>
        <label htmlFor="column-filter">
          Coluna:
          <select
            data-testid="column-filter"
            name="coluna"
            value={ valueInputs.coluna }
            onChange={ handleChange }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            data-testid="comparison-filter"
            name="operador"
            value={ valueInputs.operador }
            onChange={ handleChange }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="valor"
          data-testid="value-filter"
          value={ valueInputs.valor }
          onChange={ (e) => handleChange(e) }
        />
        <input
          type="button"
          value="Filtrar"
          data-testid="button-filter"
          onClick={ saveFilter }
        />
      </div>
    </form>
  );
}

export default Filter;
