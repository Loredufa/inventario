import React , { Fragment , useEffect } from 'react';
import Proveedor from './Proveedor';
//Redux
import { useDispatch, useSelector }from 'react-redux';
import { obtenerProveedoresAction } from '../actions/productoActions';

const Proveedores = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Consulta la api
        const cargarProductos = () => dispatch( obtenerProveedoresAction() );
        cargarProductos();
        // eslint-disable-next-line
    }, []);

    //obtener el state            ((state) => state.dogs)
    const allProveedores = useSelector((state) => state.productos.proveedores);
    const error = useSelector((state) => state.productos.error);
    console.log(allProveedores);
    const cargando = useSelector((state) => state.productos.loading);
    return ( 
        <Fragment>
            <h2 className="text-center my-5">Lista de Proveedores</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="font-weight-bold text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark text-center">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Whatsapp</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Web</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {allProveedores?.map( (element) => {
                       return(
                            <Proveedor
                            key={element.id}
                            proveedor={element}
                        />
                    )
                })}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Proveedores;