import React, { useContext, useState, useEffect } from 'react';
import { PlanetsStarWarContext } from '../context/PlanetsStarWarProvider';

function Filter() {
  const [filterName, setFilterName] = useState('');
  const cleanInputs = {
    coluna: 'population',
    operador: 'maior que',
    valor: 0,
  };
  const [valueInputs, setValueInputs] = useState(cleanInputs);
  const {
    dataApi,
    setFilter,
    filterNumber,
    setFilterNumber,
  } = useContext(PlanetsStarWarContext);

  useEffect(() => {
    const newfiltersname = (dataApi)
      .filter((planet) => planet.name.toLowerCase()
        .includes(filterName.toLowerCase()));
    const filtersNumbers = filterNumber.reduce((acc, filter) => (
      acc.filter((planeta) => {
        switch (filter.operador) {
        case 'maior que':
          return Number(planeta[filter.coluna]) > Number(filter.valor);
        case 'menor que':
          return Number(planeta[filter.coluna]) < Number(filter.valor);
        case 'igual a':
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

  const delFilter = ({ target }) => {
    const newFilters = target.id === 'all' ? []
      : filterNumber.filter((filtro) => filtro.coluna !== target.id);

    setFilterNumber(newFilters);
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
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'population'))
                && <option>population</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'orbital_period'))
                && <option>orbital_period</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'diameter'))
                && <option>diameter</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'rotation_period'))
                && <option>rotation_period</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'surface_water'))
                && <option>surface_water</option>
            }
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
        <button
          type="button"
          id="all"
          onClick={ delFilter }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>
      </div>
      {
        filterNumber
        && (
          <section>
            {
              filterNumber.map((filter, index) => (
                <p key={ `${filter.coluna} ${index}` } data-testid="filter">
                  {`${filter.coluna} ${filter.operador} ${filter.valor}`}
                  <button
                    type="button"
                    id={ filter.coluna }
                    onClick={ delFilter }
                  >
                    excluir
                  </button>
                </p>
              ))
            }
          </section>)
      }
    </form>
  );
}

export default Filter;
