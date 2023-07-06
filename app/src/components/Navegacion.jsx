import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoCaC1 from '../assets/logoCaC1.png';

export const Navegacion = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary bg-dark" data-bs-theme="dark">
            <Container className='mx-5 me-0 pb-1'>
                <Navbar.Brand href="/">
                    <img src={logoCaC1} alt="logo cac" width='75px' className='pt-2'/>
                </Navbar.Brand>
                <nav className="me-auto" id='containerNavButtons'>
                    <Link to={'/'}>
                        <button type='button' className='btn'>Home</button>
                    </Link>
                    <Link to={'/equipos'}>
                        <button type='button' className='btn'>Equipos</button>
                    </Link>
                </nav>
            </Container>
        </Navbar>
    )
};