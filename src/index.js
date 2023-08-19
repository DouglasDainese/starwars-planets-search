import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsStarWarProvider from './context/PlanetsStarWarProvider';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsStarWarProvider>
      <App />
    </PlanetsStarWarProvider>,
  );
