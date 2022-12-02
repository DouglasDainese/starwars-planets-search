import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsStarWarProvider from '../context/PlanetsStarWarProvider';
import dataApi from './dataApi';

describe('teste o componente Filter', () => { 

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi)
    })
    render(
      <PlanetsStarWarProvider>
        <App />
      </PlanetsStarWarProvider>)
  });
  
  test('se os elementos estão na tela',  () =>{
    const filterName = screen.getByRole('textbox');
    const filterNumColumn = screen.getByTestId('column-filter');
    const filterNumOperator= screen.getByTestId('comparison-filter')
    
    expect(filterName).toBeInTheDocument();
    expect(filterNumColumn).toBeInTheDocument();
    expect(filterNumOperator).toBeInTheDocument();
  });
  
  test('se ao buscar um planeta a tabela é filtrada de acordo com os dados inseridos nos filtros',  async () =>{
    const filterName = screen.getByRole('textbox');
    const tatooinePlanet = screen.findAllByRole('row', { current: /tattoine/i })
    const nabooPlanet = screen.findByRole('row', { current: /naboo/i })
    const alderaanPlanet = screen.findByRole('row', { current: /alderaan/i })

    console.log(tatooinePlanet);
   
    waitFor(() => {
      expect(tatooinePlanet).not.toBeInTheDocument();
      expect(nabooPlanet).toBeInTheDocument();
  
      userEvent(filterName, 'tat')
  
      expect(tatooinePlanet).toBeInTheDocument()
      expect(nabooPlanet).not.toBeInTheDocument();

      userEvent(filterName, 'Alde')

      expect(tatooinePlanet).not.toBeInTheDocument();
      expect(alderaanPlanet).toBeInTheDocument();

    });
  });

});