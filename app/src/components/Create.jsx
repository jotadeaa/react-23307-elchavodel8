import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useState } from 'react';

export const Create = () => {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [estado, setEstado] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [antiguedad, setAntiguedad] = useState(0);

    const equipmentCollection = collection(db, "medicalSupplies");

    const navigate = useNavigate();

    const createEquipment = async () => {
        await addDoc(equipmentCollection, {
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            estado: estado,
            cantidad: Number(cantidad),
            antiguedad: Number(antiguedad)
        });
    }

    const confirmCreate = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Confirma crear el equipo médico?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                createEquipment(e)
                .then(() => {
                    Swal.fire(
                        '¡Creado!',
                        `Se ha creado un equipo médico exitosamente.`,
                        'success'
                    ).then(() => {navigate('/equipos')});
                })
                .catch((error) => {
                    Swal.fire(
                        'Ha ocurrido un error.',
                        `Razón: ${error}`,
                        'error'
                    );
                })         
            }
          })
    }
    return (
        <section className="d-flex justify-content-center mt-4">
            <article className='d-flex flex-column align-items-center border border-2 rounded px-5 pe-5 pb-3' id='contenedorForm'>
                <h2 className='mt-4 mb-3 fs-4'>Registro de un Equipo Médico</h2>
                <Form onSubmit={confirmCreate}>
                    <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="formNombre" value={nombre} onChange={(e) => setNombre(e.target.value)}>
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="formMarca" value={marca} onChange={(e) => setMarca(e.target.value)}>
                        <Form.Label>Marca: </Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="formModelo" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                        <Form.Label>Modelo: </Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="formEstado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <Form.Label>Estado: </Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="formCantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)}>
                        <Form.Label className='text-center'>Cantidad: </Form.Label>
                        <Form.Control type="number" min="1" max="99"/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="formAntiguedad" value={antiguedad} onChange={(e) => setAntiguedad(e.target.value)}>
                        <Form.Label className='text-center'>Antiguedad: </Form.Label>
                        <Form.Control type="number" min="0" max="50"/>
                    </Form.Group>
                    <div className='d-flex justify-content-evenly mt-4'>
                        <Button variant='success' type="submit">Crear</Button>
                        <Link to="/equipos">                        
                            <Button variant='secondary'>Cancelar</Button>
                        </Link>
                    </div>
                </Form>
            </article>
        </section>
    )
}