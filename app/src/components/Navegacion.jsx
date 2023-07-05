import {Container, Nav, Navbar } from 'react-bootstrap';
import logoCaC1 from '../assets/logoCaC1.png';

export const Navegacion = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary bg-dark" data-bs-theme="dark">
            <Container className='mx-5 me-0 pb-1'>
                <Navbar.Brand href="/">
                    <img src={logoCaC1} alt="logo cac" width='75px' className='pt-2'/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/equipos">Equipos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
};