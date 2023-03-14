import React , { Fragment , useEffect } from 'react';
import CompraList from './CompraList';
//Redux
import { useDispatch, useSelector }from 'react-redux';
import { obtenerComprasAction } from '../actions/productoActions';


const Compras = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const cargarCompra = () => dispatch( obtenerComprasAction() );
        cargarCompra();
    }, []);

    //state
    const compras = useSelector(state => state.productos.compras);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Compras</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="font-weight-bold text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark text-center">
                    <tr>
                        <th scope="col">fecha</th>
                        <th scope="col">piezas</th>
                        <th scope="col">monto</th>
                        <th scope="col">Proveedor</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    compras.length > 0 ? 
                    (
                        compras.map((compra, index) => (
                            <CompraList
                            key={index}
                            compra={compra}
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
 
export default Compras;