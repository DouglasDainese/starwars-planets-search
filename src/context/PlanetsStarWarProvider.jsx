import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';

export const PlanetsStarWarContext = createContext();

function PlanetsStarWarProvider({ children }) {
  const [dataApi, setDataApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensage, setErrorMensage] = useState('');
  const [filters, setFilter] = useState([]);
  const [filterNumber, setFilterNumber] = useState([]);
  useEffect(() => {
    try {
      fetch('https://swapi.dev/api/planets')
        .then((response) => {
          setIsLoading(true);
          return response.json();
        })
        .then((planets) => {
          const planetas = planets.results.map((planet) => {
            delete planet.residents;
            return planet;
          });
          setDataApi(planetas);
          setFilter(planetas);
          setIsLoading(false);
        });
    } catch (error) {
      setErrorMensage('erro na requisição');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    dataApi,
    isLoading,
    errorMensage,
    filters,
    setFilter,
    filterNumber,
    setFilterNumber,
  };

  return (
    <PlanetsStarWarContext.Provider value={ value }>
      { children }
    </PlanetsStarWarContext.Provider>
  );
}

PlanetsStarWarProvider.propTypes = {
  children: PropTypes.object,
}.isDefault;

export default PlanetsStarWarProvider;
