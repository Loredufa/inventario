import {
    AGREGAR,
    AGREGAR_EXITO,
    AGREGAR_ERROR,
    COMENZAR_DESCARGA,
    DESCARGA_EXITO,
    DESCARGA_PROVEEDOR_EXITO,
    DESCARGA_CIENTE_EXITO,
    DESCARGA_ERROR,
    OBTENER_ELIMINAR,
    ELIMINADO_EXITO,
    ELIMINADO_ERROR,
    OBTENER_EDITAR,
    COMENZAR_EDICION,
    EDITADO_EXITO,
    EDITADO_ERROR

} from '../types';

import clienteAxios from '../config/axios';
import axios from 'axios';
import Swal from 'sweetalert2';

export function postList (payload) {
    return async function (dispatch){
        try{
        const response = await axios.post('http://localhost:4000/api/productos',payload);
        
        Swal.fire(
            'Correcto',
            'El producto se agregó correctamente',
            'success'
        )
        return response;
    
    } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text:'Hubo un error,intenta de nuevo'
            });
        }
    }
}

// Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            // Post a bd
            const respuesta =  await clienteAxios.post('/productos',producto);

            //si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(respuesta.data));
            
            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text:'Hubo un error,intenta de nuevo'
            });
        }
    }
}
export function crearNuevoProveedorAction(proveedor){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // Post a bd
            const respuesta =  await clienteAxios.post('/proveedores',proveedor);

            //si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(respuesta.data));
            
            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text:'Hubo un error,intenta de nuevo'
            });
        }
    }
}

export function crearNuevoClienteAction(cliente){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // Post a bd
            const respuesta =  await clienteAxios.post('/clientes',cliente);

            //si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(respuesta.data));
            
            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text:'Hubo un error,intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR,
    payload: true
});


//si el producto se guarda  en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_EXITO,
    payload: producto
});

// y si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_ERROR,
    payload: estado
});

//Funcion que descarga productos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data));
            //asi se puede poner para que te muestre el cargando... y traiga los datos como es una api ligera el cargando ni se muestra
            // setTimeout( async()=> {
            //     const respuesta = await clienteAxios.get('/productos');
            //     dispatch( descargaProductosExitosa(respuesta.data));
            // },1000);

        } catch (error) {
            dispatch(descargaProductosError());
        }
    }
}

export function obtenerProveedoresAction(){
    return async (dispatch) => {
        dispatch( descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/proveedores');
            dispatch( descargaProveedorExitosa(respuesta.data));
            //asi se puede poner para que te muestre el cargando... y traiga los datos como es una api ligera el cargando ni se muestra
            // setTimeout( async()=> {
            //     const respuesta = await clienteAxios.get('/productos');
            //     dispatch( descargaProductosExitosa(respuesta.data));
            // },1000);

        } catch (error) {
            dispatch(descargaProductosError());
        }
    }
}

export function obtenerClientesAction(){
    return async (dispatch) => {
        dispatch( descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/clientes');
            dispatch( descargaClienteExitosa(respuesta.data));
            //asi se puede poner para que te muestre el cargando... y traiga los datos como es una api ligera el cargando ni se muestra
            // setTimeout( async()=> {
            //     const respuesta = await clienteAxios.get('/productos');
            //     dispatch( descargaProductosExitosa(respuesta.data));
            // },1000);

        } catch (error) {
            dispatch(descargaProductosError());
        }
    }
}


const descargarProductos = () => ({
    type: COMENZAR_DESCARGA,
    payload: true
});

const descargaProductosExitosa = payload => ({
        type: DESCARGA_EXITO,
        payload: payload
});
const descargaProveedorExitosa = payload => ({
    type: DESCARGA_PROVEEDOR_EXITO,
    payload: payload
});
const descargaClienteExitosa = payload => ({
    type: DESCARGA_CIENTE_EXITO,
    payload: payload
});

const descargaProductosError = () => ({
    type: DESCARGA_ERROR,
    payload: true
});

//Selecciona y elimina 
export function borrarProductoAction(id){
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch (eliminarProductoExito());

            //Si se elimina, Mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se ha sido eliminado correctamente.',
                'success'
              )
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

export function borrarProveedorAction(id){
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/proveedores/${id}`);
            dispatch (eliminarProductoExito());

            //Si se elimina, Mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El proveedor se ha sido eliminado correctamente.',
                'success'
              )
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

export function borrarClienteAction(id){
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/clientes/${id}`);
            dispatch (eliminarProductoExito());

            //Si se elimina, Mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El cliente se ha sido eliminado correctamente.',
                'success'
              )
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: ELIMINADO_ERROR,
    payload: true
});

//Colocar en edicion  
export function editarProductionAction(producto){
    return async (dispatch) => {
        dispatch( obtenerProductoEditar(producto) );
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_EDITAR,
    payload: producto
});

//Edita un registro en la API y state
// esta tiene que estar disponible en el componente
//porqe tengo que leer nuevos valores
export function editarProductoAction(producto){
    return async(dispatch)=>{
        dispatch( editarProducto(producto) );

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto));
        } catch (error) {
            dispatch ( editarProductoError() );
        }
    }
}

export function editarProveedorAction(proveedor){
    return async(dispatch)=>{
        dispatch( editarProducto(proveedor) );

        try {
            await clienteAxios.put(`/proveedores/${proveedor.id}`, proveedor);
            dispatch( editarProductoExito(proveedor));
        } catch (error) {
            dispatch ( editarProductoError() );
        }
    }
}

export function editarClienteAction(cliente){
    return async(dispatch)=>{
        dispatch( editarProducto(cliente) );

        try {
            await clienteAxios.put(`/clientes/${cliente.id}`, cliente);
            dispatch( editarProductoExito(cliente));
        } catch (error) {
            dispatch ( editarProductoError() );
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION
});

const editarProductoExito = producto => ({
    type: EDITADO_EXITO,
    payload : producto
});

const editarProductoError = () => ({
    type: EDITADO_ERROR,
    payload: true
});

