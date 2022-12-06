import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsStarWarProvider from '../context/PlanetsStarWarProvider';
import dataApi from './dataApi';

describe('teste o componente Filter', () => { 

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi)
    })  
  });

  test('se os elementos estão na tela',  () =>{
    act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
    
    const filterName = screen.getByTestId('name-filter');
    const filterNumColumn = screen.getByTestId('column-filter');
    const filterNumOperator= screen.getByTestId('comparison-filter')
    
    expect(filterName).toBeInTheDocument();
    expect(filterNumColumn).toBeInTheDocument();
    expect(filterNumOperator).toBeInTheDocument();
  });
  
  test('se ao buscar um planeta a tabela é filtrada de acordo com os dados inseridos nos filtros',  async () =>{
    act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
   
    const filterName = screen.getByTestId('name-filter');
    const tatooinePlanet = await screen.findByRole('cell', { name: /tatooine/i })
    const nabooPlanet = await screen.findByRole('cell', { name: /naboo/i })
    
      expect(tatooinePlanet).toBeInTheDocument();
      expect(nabooPlanet).toBeInTheDocument();
  
      userEvent.type(filterName, 'tat')
  
      expect(tatooinePlanet).toBeInTheDocument()
      expect(nabooPlanet).not.toBeInTheDocument();

  });

  test('se o filtro por nome não diferencia letras maiusculas de minusculas',  async () =>{
    act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
    const filterName = screen.getByTestId('name-filter');
    const tatooinePlanet = await screen.findByRole('cell', {name: /tatooine/i })

    userEvent.type(filterName, 'TATOOINE');

    expect(tatooinePlanet).toBeInTheDocument();

  });

  test('se é possivel user filtros numericos',  async () =>{
    act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
    const filterNumber = screen.getByTestId('button-filter');
    const filterColumn = screen.getByTestId('column-filter');
    const filterOperator = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const tatooinePlanet = await screen.findByRole('cell', {name: /tatooine/i })
    const bespinPlanet = await screen.findByRole('cell', {name: /bespin/i })

    userEvent.selectOptions(filterColumn, 'rotation_period');
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.type(filterValue, '12');
    userEvent.click(filterNumber);

    // screen.logTestingPlaygroundURL()

    expect(tatooinePlanet).not.toBeInTheDocument();
    expect(bespinPlanet).toBeInTheDocument();

  });

  test('se é possivel deletar filtros numericos',  async () =>{
    act(() => {
      render(
        <PlanetsStarWarProvider>
          <App />
        </PlanetsStarWarProvider>)
    });
    const filterNumber = screen.getByTestId('button-filter');
    const filterColumn = screen.getByTestId('column-filter');
    const filterOperator = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const Planets = await screen.findAllByTestId('planet-name');
    const bespinPlanet = await screen.findByRole('cell', {name: /bespin/i });
    const one = 1;
    const ten = 10;

    userEvent.selectOptions(filterColumn, 'rotation_period');
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.type(filterValue, '12');
    userEvent.click(filterNumber);

    const deletFilterBtn = await screen.findByRole('button', { name: /excluir/i });
    const displayFilters = screen.getByText(/rotation_period igual a 012/i);
    
    waitFor(()=>{
      expect(Planets).toHaveLength(ten);
      expect(bespinPlanet).toBeInTheDocument();
      expect(displayFilters).toBeInTheDocument();
    });

    userEvent.click(deletFilterBtn);
    // screen.logTestingPlaygroundURL()
    expect(Planets).toHaveLength(ten);
    expect(bespinPlanet).toBeInTheDocument();
    expect(displayFilters).not.toBeInTheDocument();



  });

})
