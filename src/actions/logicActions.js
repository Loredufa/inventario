import { AGREGAR_ERROR } from '../types';
import axios from 'axios';
import Swal from 'sweetalert2';


export function postPurchase (payload) {
    return async function (dispatch){
        try{
        const response = await axios.post('http://localhost:4000/api/compras',payload);
            
        Swal.fire(
            'Correcto',
            'Se agregó la compra',
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
                    text:`Hubo un error en la compra ${payload}`
                });
            }
        }
}

export function postMove (payload) {
    return async function (dispatch){
        try{
        const response = await axios.post('http://localhost:4000/api/movimientos',payload);
        
        Swal.fire(
            'Correcto',
            'Se generó el movimiento',
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
                text:`Hubo un error en el movimiento ${payload}`
            });
        }
    }
}

export function postSale (payload) {
    return async function (dispatch){
        try{
        const response = await axios.post('http://localhost:4000/api/ventas',payload);
            
        Swal.fire(
            'Correcto',
            'Se registró la venta',
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
                    text:`Hubo un error en la venta${payload.customerId}`
                });
            }
        }
}

const agregarProductoError = estado => ({
    type: AGREGAR_ERROR,
    payload: estado
});