import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarClienteAction , editarClienteAction } from '../actions/productoActions';

const VentaList = ({venta}) => {
    const { id, fecha, piezas , monto, fecha_entrega, customerId }= venta;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // habilitar history para redireccion


    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "La venta no se puede recuperar!",
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
    const redireccionarEdicion = prod => {
        dispatch( editarClienteAction(prod)) ;
        navigate(`/productos/editar/${prod.id}`);
    }

    return ( 
        <tr className="text-center">
            <td>{fecha}</td>
            <td>{piezas}</td>
            <td>${monto}</td>
            <td><span className="font-weight-bold">{customerId}</span></td>
            <td><span className="font-weight-bold"> {fecha_entrega}</span></td>
            <td className="acciones">
                {/* <button 
                    type= "button"
                    onClick= { () => redireccionarEdicion(venta) }
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick = {() =>confirmarEliminarProducto(id)}
                >Eliminar</button> */}
            </td>

        </tr>
    );
}
 
export default VentaList;