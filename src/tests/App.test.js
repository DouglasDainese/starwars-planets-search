import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import PlanetsStarWarProvider from '../context/PlanetsStarWarProvider';
import dataApi from './dataApi';

describe('teste geral da Aplicação', () => { 
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi)
    })
  });
  test('se a API é Chamada', async () => {
     act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
    expect(global.fetch).toHaveBeenCalled();
  })

//   test('se um erro é retornado caso a requisição a API falhar', async () => {
//     act(() => {
//      render(
//        <PlanetsStarWarProvider>
//          <App />
//        </PlanetsStarWarProvider>)
//    });
//    expect(global.fetch).toThrow('erro na requisição');
//  })

  test('o componente table', async () => {
    act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
    const tabela = screen.getByRole('table');
    const headerTable = screen.getAllByRole('columnheader');
    const theaderSize = 13;

    expect(tabela).toBeInTheDocument();
    expect(headerTable).toHaveLength(theaderSize);
  });
  
});