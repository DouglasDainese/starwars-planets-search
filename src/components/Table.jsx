import React, { useContext } from 'react';
import { PlanetsStarWarContext } from '../context/PlanetsStarWarProvider';

function Table() {
  const { filters } = useContext(PlanetsStarWarContext);

  return (
    <section className="table-filter">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de rotação</th>
            <th>Período orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Surface water</th>
            <th>População</th>
            <th>Filmes</th>
          </tr>
        </thead>
        <tbody>
          {
            filters.length > 0 && filters.map((planet) => (
              <tr key={ planet.name } id="table-row">
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td id="cedula-filmes">
                  {planet.films.map((film, index) => (
                    <p key={ index }>{film}</p>
                  ))}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Table;
