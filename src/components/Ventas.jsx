import React , { Fragment , useEffect } from 'react';
import VentaList from './VentaList';
//Redux
import { useDispatch, useSelector }from 'react-redux';
import { obtenerVentasAction } from '../actions/productoActions';


const Ventas = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const cargarVenta = () => dispatch( obtenerVentasAction() );
        cargarVenta();
    }, []);

    //state
    const ventas = useSelector(state => state.productos.ventas);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Ventas</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="font-weight-bold text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark text-center">
                    <tr>
                        <th scope="col">fecha</th>
                        <th scope="col">piezas</th>
                        <th scope="col">monto</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">fecha_entrega</th>

                    </tr>
                </thead>
                <tbody>
                  {
                    ventas.length > 0 ? 
                    (
                        ventas.map((venta, index) => (
                            <VentaList
                            key={index}
                            venta={venta}
                        />
                    ))
                    ) : (
                        <tr><td>No hay Productos</td></tr>
                        )
                    }
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Ventas;