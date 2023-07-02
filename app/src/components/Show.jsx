import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Buscador } from "./Buscador";

export const Show = () => {
  // (fer) utilizamos el hook useLocation para tomar lo que viene por params del buscador
    const useQuery = () => {
       return new URLSearchParams(useLocation().search);
        const query = useQuery()
        const search = query.get("search");    
    }
 
    // Configuro los hooks
    const [equipments, setEquipments] = useState([]);
    // Obtengo los documentos de la db de firestore
    const equipmentCollection = collection(db, "medicalSupplies");
    // Función para mostrar los docs
    const getEquipments = async () => {
        const data = await getDocs(equipmentCollection);
        setEquipments(
            data.docs.map(doc => ({
            ...doc.data(),
                id: doc.id
            })));
    };

    // (fer) función para mostrar un sólo doc 
    const getEquipment = async (id) => {
      const equipment = await getDoc(await doc(db, "medicalSupplies", id));
    };  

    const navigate = useNavigate();
    // Cuatro: crear función para eliminar un doc
    const removeEquipment = async (id) => {
        const equipmentDoc = doc(db, "medicalSupplies", id);
        return await deleteDoc(equipmentDoc);
    };
    // Cinco: crear función para confirmar con Sweet Alert
    const confirmRemove = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // Llamo a la función removeEquipment
                removeEquipment(id);
                // Notificar que se ha eliminado
                Swal.fire(
                '¡Eliminado!',
                'El equipo médico se ha eliminado.',
                'success'
              ).then(() => {location.reload()});              
            }
          })
    };
    // Seis: utilizar useEffect
    useEffect(() => {
        getEquipments();
    }, []);
    // Siete: devolver el estado de los docs
    if (equipments.length === 0){
        return (
            <div className="text-center">Loading...</div>
        )
    }
    return <>
        <div className="container">
          <div className="row">
            <div className="col">
              <Buscador />
            </div>
            <div className="col">
              <Link to="/create">
                <Button variant="success" className="mt-2 mb-2">
                  Agregar
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container-fluid" id="contenedorTabla">
          <Table bordered hover responsive id="tablaEquipamentos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Antiguedad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment) => (
                <tr key={equipment.id}>
                  <td className="text-center">{equipment.nombre}</td>
                  <td className="text-center">{equipment.marca}</td>
                  <td className="text-center">{equipment.modelo}</td>
                  <td className="text-center">{equipment.estado}</td>
                  <td className="text-center">{equipment.cantidad}</td>
                  <td className="text-center">{`${equipment.antiguedad} año(s)`}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/edit/${equipment.id}`}>
                        <Button variant="warning">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="-1 1 23 23"
                            strokeWidth="2"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                          </svg>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => confirmRemove(equipment.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="-1 1 23 23"
                          strokeWidth="2"
                          stroke="#FFFFFF"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    ;
}