import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import logoImg from './img/logo-star-wars.png';

function App() {
  return (
    <>
      <div id="circle-1">
        <div id="circle-2">
          <img src={ logoImg } alt="logo StarWar" />
        </div>
      </div>
      <main>
        <Filter />
        <Table />
      </main>
    </>
  );
}

export default App;
