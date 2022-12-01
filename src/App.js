import React, { useContext } from 'react';
import './App.css';
import { PlanetsStarWarContext } from './context/PlanetsStarWarProvider';
import Table from './components/Table';
import Filter from './components/Filter';

function App() {
  const { isLoading } = useContext(PlanetsStarWarContext);
  return (
    <>
      <h1>Star Wars Planets</h1>
      <span>Hello, Padawans!</span>
      <Filter />
      {
        isLoading ? <h1>Carregando...</h1> : <Table />
      }
    </>
  );
}

export default App;
