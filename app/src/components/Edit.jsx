import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export const Edit = () => {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [estado, setEstado] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [antiguedad, setAntiguedad] = useState(0);

    const navigate = useNavigate();
    const { equipmentId } = useParams();

    console.log(equipmentId);

    const updateEquipment = async () => {
        const dataDB = doc(db, "medicalSupplies", equipmentId);
        const data = {
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            estado: estado,
            cantidad: Number(cantidad),
            antiguedad: Number(antiguedad)
        };
        // El primer parámetro es la información del doc, el segundo la información a reemplazar
        await updateDoc(dataDB, data);
    }

    const getEquipmentById = async (id) => {
        const equipmentDoc = await getDoc(await doc(db, "medicalSupplies", id));
        if (equipmentDoc.exists()){
            setNombre(equipmentDoc.data().nombre);
            setMarca(equipmentDoc.data().marca);
            setModelo(equipmentDoc.data().modelo);
            setEstado(equipmentDoc.data().estado);
            setCantidad(equipmentDoc.data().cantidad);
            setAntiguedad(equipmentDoc.data().antiguedad);
        } else{
            console.log("No se ha encontrado el equipo médico.");
        }
    }

    const confirmModify = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Confirma modificación?',
            text: "¡Esta acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Modificar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                updateEquipment()
                .then(() => {
                    Swal.fire(
                        'Modificado.',
                        'El equipo médico ha sido modificado exitosamente.',
                        'success'
                        ).then(() => {navigate('/')});
                })
                .catch((error) => {
                    Swal.fire(
                        'Ha ocurrido un error.',
                        `Razón: ${error}`,
                        'error'
                    )
                });
            }
          })
    }

    useEffect(() => {
        getEquipmentById(equipmentId);
    }, []);

    if (!nombre || !marca || !modelo || !estado || cantidad == 0 || antiguedad == 0){
        return (
            <div className='text-center'>Loading...</div>
        )
    }
    return (
    <section className="d-flex justify-content-center mt-4">
        <article className='d-flex flex-column align-items-center border border-2 rounded px-5 pe-5 pb-3' id='contenedorForm'>
            <h2 className='mt-4 mb-3 fs-4'>Modificación de un Equipo Médico</h2>
            <form onSubmit={confirmModify}>
                <div className='mb-3 d-flex align-items-center gap-3'>
                    <label className='form-label'>Nombre: </label>
                    <input type="text" className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} id='formNombre'/>
                </div>
                <div className='mb-3 d-flex align-items-center gap-3'>
                    <label className='form-label'>Marca: </label>
                    <input type="text" className='form-control' value={marca} onChange={(e) => setMarca(e.target.value)} id='formMarca'/>
                </div>
                <div className='mb-3 d-flex align-items-center gap-3'>
                    <label className='form-label'>Modelo: </label>
                    <input type="text" className='form-control' value={modelo} onChange={(e) => setModelo(e.target.value)} id='formModelo'/>
                </div>
                <div className='mb-3 d-flex align-items-center gap-3'>
                    <label className='form-label'>Estado: </label>
                    <input type="text" className='form-control' value={estado} onChange={(e) => setEstado(e.target.value)} id='formNombre'/>
                </div>
                <div className='mb-3 d-flex align-items-center gap-3'>
                    <label className='form-label'>Cantidad: </label>
                    <input type="number" className='form-control' 
                    value={cantidad} onChange={(e) => setCantidad(e.target.value)} 
                    id='formCantidad'
                    min='1' max='99'/>
                </div>
                <div className='mb-3 d-flex align-items-center gap-3'>
                    <label className='form-label'>Antiguedad: </label>
                    <input type="number" className='form-control' 
                    value={antiguedad} onChange={(e) => setAntiguedad(e.target.value)} 
                    id='formAntiguedad'
                    min='0' max='50'/>
                </div>
                <div className='d-flex justify-content-evenly mt-4'>
                    <Button variant='success' type="submit">Modificar</Button>
                    <Link to="/">                        
                        <Button variant='secondary'>Cancelar</Button>
                    </Link>
                </div>
            </form>
        </article>
    </section>
    )
}