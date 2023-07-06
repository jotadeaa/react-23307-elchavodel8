import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Equip } from './components/Equip';
import { Show } from './components/Show';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { Navegacion } from './components/Navegacion';
import { Home } from './components/Home';
import logoCaC1 from './assets/logoCaC1.png';
import './App.css';
import { Navegacion } from './components/Navegacion';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navegacion/>
        <header>
          <article className='header-text'>
            <h1>Equipos Médicos</h1>
            <p>Grupo 8 - <span className='fw-semibold fst-italic'>Codo a Codo ~ 2023</span></p>
          </article>
          <Navegacion/>
        </header>
        <main>
          <div className='d-flex justify-content-center '>
            <h2 className='mt-2 fs-2 fw-lighter' id='mainH2'>Proyecto CRUD con React & Firestore</h2>
          </div>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/equipos" element={ <Show /> }/>
          <Route path="/create" element={ <Create /> }/>
          <Route path="/edit/:equipmentId" element={ <Edit /> }/>
          <Route path="/equipo/:nombre" element={ <Equip /> }/>
        </Routes>
        </main>
        <footer className='bg-dark'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex gap-2 flex-row'>
              <img src={logoCaC1} alt="logo cac" width='75px' className='pt-2'/>
              <p className='mb-0 fs-4 text-white-50 fst-italic pt-2 txtFooterCaC'>Codo a Codo ~ React</p>
            </div>
            <p className='mb-0 text-white-50 pt-3 txtFooterCaC'>Grupo 8 ~ CaC React &copy; 2023</p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
