import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarClienteAction , editarClienteAction } from '../actions/productoActions';

const Cliente = ({cliente}) => {
    const { id, nombre , direccion, telefono, whatsapp ,mail, web }= cliente;

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
                dispatch( borrarClienteAction(id) );
              
            }
          })
    }

    //Funcion que redirige de forma programada
    const redireccionarEdicion = cliente => {
        dispatch( editarClienteAction(cliente)) ;
        navigate(`/productos/editar/${cliente.id}`);
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
                    onClick= { () => redireccionarEdicion(cliente) }
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
 
export default Cliente;