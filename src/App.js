import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';

function App() {
  return (
    <>
      <h1>Star Wars Planets</h1>
      <span>Hello, Padawans!</span>
      <Filter />
      <Table />
    </>
  );
}

export default App;
