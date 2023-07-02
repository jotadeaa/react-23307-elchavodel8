import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Show } from './components/Show';
import { Create } from './components/create';
import { Edit } from './components/edit';
import logoCaC1 from './assets/logoCaC1.png';
import './App.css';
import { Equip } from './components/Equip';

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <article className='header-text'>
            <h1>Grupo 8</h1>
            <p>Codo a Codo - 2023</p>
          </article>
        </header>
        <main>
          <h2 className='text-center mt-3'>Tabla de datos de equipos médicos</h2>
        <Routes>
          <Route path="/" element={ <Show /> }/>
          <Route path="/create" element={ <Create /> }/>
          <Route path="/edit/:equipmentId" element={ <Edit /> }/>
          <Route path="/equipo/:nombre" element={ <Equip /> }/>
        </Routes>
        </main>
        <footer className='bg-dark'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex gap-2 flex-row'>
              <img src={logoCaC1} alt="logo cac" width='75px' className='pt-2'/>
              <p className='mb-0 fs-4 text-white-50 fst-italic pt-2 txtFooterCaC'>Codo a Codo - React</p>
            </div>
            <p className='mb-0 text-white-50 pt-3 txtFooterCaC'>Grupo 8 CaC React &copy; 2023</p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
