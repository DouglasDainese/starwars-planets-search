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
      <div id="container-filter-name">
        <input
          id="name-filter"
          type="text"
          name="filterName"
          data-testid="name-filter"
          placeholder="Filtre por nome"
          onChange={ (e) => handleChange(e) }
          value={ filterName }
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.8292 12.8292C14.9398 10.7186 14.9398 7.29659 12.8292 5.18598C10.7186 3.07538 7.29659 3.07538 5.18598 5.18598C3.07538 7.29659 3.07538 10.7186 5.18598 12.8292C7.29659 14.9398 10.7186 14.9398 12.8292 12.8292ZM13.9756 16.5233C10.4782 18.8405 5.71968 18.4583 2.63826 15.3769C-0.879419 11.8592 -0.879419 6.15594 2.63826 2.63826C6.15594 -0.879419 11.8592 -0.879419 15.3769 2.63826C18.4583 5.71968 18.8405 10.4782 16.5233 13.9756L20.4723 17.9246C21.1759 18.6282 21.1759 19.7688 20.4723 20.4723C19.7688 21.1759 18.6282 21.1759 17.9246 20.4723L13.9756 16.5233Z"
            fill="white"
          />
        </svg>
      </div>
      <div id="container-filter-operator">
        <label className="filtros" htmlFor="column-filter">
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
                && <option className="dropdown">population</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'orbital_period'))
                && <option className="dropdown">orbital_period</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'diameter'))
                && <option className="dropdown">diameter</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'rotation_period'))
                && <option className="dropdown">rotation_period</option>
            }
            {
              !filterNumber.some((filters) => (
                filters.coluna === 'surface_water'))
                && <option className="dropdown">surface_water</option>
            }
          </select>
        </label>
        <label className="filtros" htmlFor="comparison-filter">
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
        <div className="TEST">
          <input
            id="input-value"
            type="number"
            name="valor"
            data-testid="value-filter"
            value={ valueInputs.valor }
            onChange={ (e) => handleChange(e) }
          />
          <input
            className="btn"
            type="button"
            value="FILTRAR"
            data-testid="button-filter"
            onClick={ saveFilter }
          />
        </div>

        <button
          className="btn"
          type="button"
          id="all"
          onClick={ delFilter }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>

      </div>
      <section className="applied-filters">
        {
          filterNumber.length > 0 && (
            <>
              {
                filterNumber.map((filter, index) => (
                  <span key={ `${filter.coluna} ${index}` } data-testid="filter">
                    {`${filter.coluna} ${filter.operador} ${filter.valor}`}
                    <button
                      type="button"
                      id={ filter.coluna }
                      onClick={ delFilter }
                    >
                      excluir
                    </button>
                  </span>
                ))
              }

            </>)
        }

      </section>

    </form>
  );
}

export default Filter;
