import React , { Fragment , useEffect, useState } from 'react';
import Producto from './Producto';
//Redux
import { useDispatch, useSelector }from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';

const Productos = () => {

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    useEffect(() => {
        // Consulta la api
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();
        // eslint-disable-next-line
    }, []);

    //obtener el state
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);
    
    //busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    //filtrado
    const result = !search? productos : productos.filter((dato) => dato.nombre.toLowerCase().includes(search.toLowerCase()))

    return ( 
        <Fragment>
            <input type="text" value={search} onChange={searcher} placeholder='Search' className='form-control'/>
            <h2 className="text-center my-5">Lista de Productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="font-weight-bold text-center">Cargando...</p> : null}
            <table className="table table-striped table-sm">
                <thead className="bg-primary table-dark text-center">
                    <tr>
                        <th scope="col">Codigo de barras</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio de compra</th>
                        <th scope="col">Precio de venta</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    productos.length > 0 ? 
                    (
                        result.map((producto, index) => (
                            <Producto
                            key={index}
                            producto={producto}
                        />
                    ))
                    ) : (
                        <tr scope="row"><td colspan="2">No hay Productos</td></tr>
                        )
                    }
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Productos;