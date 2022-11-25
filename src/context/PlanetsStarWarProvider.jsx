import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';

export const PlanetsStarWarContext = createContext();

function PlanetsStarWarProvider({ children }) {
  const [dataApi, setDataApi] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensage, setErrorMensage] = useState('');
  useEffect(() => {
    try {
      setIsLoading(true);
      fetch('https://swapi.dev/api/planets')
        .then((response) => response.json())
        .then((planets) => {
          const planetas = planets.results.map((planet) => {
            delete planet.residents;
            return planet;
          });
          setDataApi(planetas);
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
  };

  return (
    <PlanetsStarWarContext.Provider value={ value }>
      { children }
    </PlanetsStarWarContext.Provider>
  );
}

PlanetsStarWarProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PlanetsStarWarProvider;
