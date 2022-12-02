import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsStarWarProvider from '../context/PlanetsStarWarProvider';
import dataApi from './dataApi';

describe('teste geral da Aplicação', () => { 
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi)
    })
    render(
      <PlanetsStarWarProvider>
        <App />
      </PlanetsStarWarProvider>)
  });
  test('se a API é Chamada', () => {
    expect(global.fetch).toHaveBeenCalled();
  })

  test('o componente table', async () => {
    const tabela = screen.getByRole('table');
    const headerTable = screen.getAllByRole('columnheader');
    const planetsInfor = screen.findAllByTestId('planet-name');
    const headerSize = 13;
    const rowSize = 10;

    console.log((await planetsInfor).length);

    expect(tabela).toBeInTheDocument();
    expect(headerTable).toHaveLength(headerSize);
    expect((await planetsInfor).length).toHaveLength(rowSize);
  });
  
});