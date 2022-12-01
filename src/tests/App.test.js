import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsStarWarProvider from '../context/PlanetsStarWarProvider';
import dataApi from './dataApi';

describe('teste geral da Aplicação', () => { 
  beforeEach(() => {
    render(
      <PlanetsStarWarProvider>
        <App />
      </PlanetsStarWarProvider>)
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi)
    })});

    test('o componente Filter', async () =>{
      const filterName = screen.getByRole('textbox');
    const filterNumColumn = screen.getByTestId('column-filter');
    const filterNumOperator= screen.getByTestId('comparison-filter')

    expect(filterName).toBeInTheDocument();
    expect(filterNumColumn).toBeInTheDocument();
    expect(filterNumOperator).toBeInTheDocument();

    });

  test('o componente table', async () => {
    const tabela = screen.getByRole('table');
    const headerTable = screen.getAllByRole('columnheader');
    const headerSize = 13;
    console.log(headerTable.length);

    expect(tabela).toBeInTheDocument();
    expect(headerTable).toHaveLength(headerSize);
  });
  
//   test('a função fetchStarWarsApi', async () => {
//     expect(global.fetch).toBeCalled();
//  });

});