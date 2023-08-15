import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Buscador } from "./Buscador";
import { Loading } from "./Loading";
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';

export const Show = () => { 
    const [equipments, setEquipments] = useState([]);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState(false);
    const equipmentCollection = collection(db, "medicalSupplies");
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);

    // Función para mostrar los docs
    const getEquipments = async (pagina) => {
        const data = await getDocs(equipmentCollection);
        const datosTotales = [...data.docs.map(doc => ({
          ...doc.data(),
              id: doc.id
          }))];
        const equiposMedicosPaginado = [];
        for (let i = 0; i < datosTotales.length; i++){
          if (i % 10 === 0 && i != 0){
            equiposMedicosPaginado.push({
             page: i/10,
             docs: i == 10 ? 
             [...datosTotales.slice(undefined, i)] : [...datosTotales.slice(i, i+10)]
            });
          }          
        }
        setMaxPages(equiposMedicosPaginado.length);
        for (let i = 0; i < equiposMedicosPaginado.length; i++){
          if (equiposMedicosPaginado[i].page == pagina){
            setEquipments(equiposMedicosPaginado[i].docs);
            break;
          }
        }
    };

    // (fer) función para mostrar un sólo doc 
    const getEquipment = async (id) => {
      const equipment = await getDoc(await doc(db, "medicalSupplies", id));
    };
    // (fer) utilizamos el hook useLocation para tomar lo que viene por params del buscador
    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
       const query = useQuery()
       const search = query.get("search");
   }

    const removeEquipment = async (id) => {
        const equipmentDoc = doc(db, "medicalSupplies", id);
        return await deleteDoc(equipmentDoc);
    };
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
                removeEquipment(id);
                Swal.fire(
                '¡Eliminado!',
                'El equipo médico se ha eliminado.',
                'success'
              ).then(() => {location.reload()});              
            }
          })
    };

    const filterEquipments = (sortBy) => {
      setSortField(sortBy)
      setSortOrder(!sortOrder);

      if (sortBy === "nombre") {
        setEquipments(prevEquipments => (
          prevEquipments.slice().sort((a, b) => (
            sortOrder ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
          ))
        ));
        return
      }

      if (sortBy === "marca") {
        setEquipments(prevEquipments => (
          prevEquipments.slice().sort((a, b) => (
            sortOrder ? a.marca.localeCompare(b.marca) : b.marca.localeCompare(a.marca)
          ))
        ));
        return
      }

      if (sortBy === "modelo") {
        setEquipments(prevEquipments => (
          prevEquipments.slice().sort((a, b) => (
            sortOrder ? a.modelo.localeCompare(b.modelo) : b.modelo.localeCompare(a.modelo)
          ))
        ));
        return
      }
      
      if (sortBy === "estado") {
        setEquipments(prevEquipments => (
          prevEquipments.slice().sort((a, b) => (
            sortOrder ? a.estado.localeCompare(b.estado) : b.estado.localeCompare(a.estado)
          ))
        ));
        return
      }

      if (sortBy === "cantidad") {
        setEquipments(prevEquipments => (
          prevEquipments.slice().sort((a, b) => (
            sortOrder ? a.cantidad - b.cantidad : b.cantidad - a.cantidad
          ))
        ));
        return
      }

      if (sortBy === "antiguedad") {
        setEquipments(prevEquipments => (
          prevEquipments.slice().sort((a, b) => (
            sortOrder ? a.antiguedad - b.antiguedad : b.antiguedad - a.antiguedad
          ))
        ));
        return
      }
    };

    const Sorter = () => {
      return sortOrder ? <FaAngleDown /> : <FaAngleUp />
    };

    useEffect(() => {
        getEquipments(page);
    }, [page]);

    if (equipments.length === 0){
        return (
            <>
              <Loading />
            </>
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
                <th><a onClick={() => filterEquipments("nombre")}>Nombre { sortField === "nombre" ? Sorter() : <></> }</a></th>
                <th><a onClick={() => filterEquipments("marca")}>Marca { sortField === "marca" ? Sorter() : <></> }</a></th>
                <th><a onClick={() => filterEquipments("modelo")}>Modelo { sortField === "modelo" ? Sorter() : <></> }</a></th>
                <th><a onClick={() => filterEquipments("estado")}>Estado {  sortField === "estado" ? Sorter() : <></> }</a></th>
                <th><a onClick={() => filterEquipments("cantidad")}>Cantidad { sortField === "cantidad" ? Sorter() : <></> }</a></th>
                <th><a onClick={() => filterEquipments("antiguedad")}>Antigüedad {  sortField === "antiguedad" ? Sorter() : <></> }</a></th>
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
                  <td className="text-center">{equipment.antiguedad === 0 ?
                  `Nuevo` : (equipment.antiguedad === 1 ? `${equipment.antiguedad} año` :
                  `${equipment.antiguedad} años`)}</td>
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
          <div id="contenedorPaginacion" className="d-flex justify-content-between">
            <Button className={page == 1 ? "btn primary disabled" : "primary"} onClick={() => page == 1 ? setPage(page) : setPage(page-1)}>Página anterior</Button>
            <p className="fw-semibold">Página: {page}</p>
            <Button className={page == maxPages ? "btn primary disabled" : "primary"} onClick={() => page <= maxPages ? setPage(page+1) : setPage(maxPages)}>Página Siguiente</Button>
          </div>
        </div>
      </>
    ;
}