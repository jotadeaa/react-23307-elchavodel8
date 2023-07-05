import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoCaC1 from '../assets/logoCaC1.png';

export const Navegacion = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary bg-dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logoCaC1} alt="logo cac" width='75px' className='pt-2'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Listas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/equipos">Equipos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};