import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction , editarProductionAction } from '../actions/productoActions';

const Producto = ({producto}) => {
    const { id, codigo_barras, nombre , descripcion, cantidad, precio_compra ,precio_venta, categoria }= producto;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // habilitar history para redireccion

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                //pasarlo al action
                dispatch( borrarProductoAction(id) );
              
            }
          })
    }

    //Funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( editarProductionAction(producto)) ;
        navigate(`/productos/editar/${producto.id}`);
    }
    return ( 
        <tr className="text-center">
            <td>{codigo_barras}</td>
            <td>{nombre}</td>
            <td>{descripcion}</td>
            <td><span className="font-weight-bold"> {cantidad}</span></td>
            <td><span className="font-weight-bold">$ {precio_compra}</span></td>
            <td><span className="font-weight-bold">$ {precio_venta}</span></td>
            <td>{categoria}</td>
            <td className="acciones">
                <button 
                    type= "button"
                    onClick= { () => redireccionarEdicion(producto) }
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
 
export default Producto;