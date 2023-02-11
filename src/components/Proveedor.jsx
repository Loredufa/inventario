import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProveedorAction , editarProveedorAction } from '../actions/productoActions';

const Proveedor = ({proveedor}) => {
    const { id, nombre , direccion, telefono, whatsapp ,mail, web }= proveedor;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // habilitar history para redireccion

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un proveedor que se elimina no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                //pasarlo al action
                dispatch( borrarProveedorAction(id) );
              
            }
          })
    }

    //Funcion que redirige de forma programada
    const redireccionarEdicion = proveedor => {
        dispatch( editarProveedorAction(proveedor)) ;
        navigate(`/proveedores/${proveedor.id}`);
    }
    return ( 
        <tr className="text-center">
            <td>{nombre}</td>
            <td>{direccion}</td>
            <td><span> {telefono}</span></td>
            <td><span> {whatsapp}</span></td>
            <td><span> {mail}</span></td>
            <td>{web}</td>
            <td className="acciones">
                <button 
                    type= "button"
                    onClick= { () => redireccionarEdicion(proveedor) }
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick = {() =>confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>

        </tr>
    );
}
 
export default Proveedor;