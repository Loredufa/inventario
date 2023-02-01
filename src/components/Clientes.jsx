import React , { Fragment , useEffect } from 'react';
import Cliente from './Cliente';
//Redux
import { useDispatch, useSelector }from 'react-redux';
import { obtenerClientesAction } from '../actions/productoActions';

const Clientes = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Consulta la api
        const cargarClientes = () => dispatch( obtenerClientesAction() );
        cargarClientes();
        // eslint-disable-next-line
    }, []);

    //obtener el state            ((state) => state.dogs)
    const allClientes = useSelector((state) => state.productos.clientes);
    const error = useSelector((state) => state.productos.error);
    console.log(allClientes);
    const cargando = useSelector((state) => state.productos.loading);
    return ( 
        <Fragment>
            <h2 className="text-center my-5">Lista de Clientes</h2>
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
                {allClientes?.map( (element) => {
                       return(
                            <Cliente
                            key={element.id}
                            cliente={element}
                        />
                    )
                })}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Clientes;