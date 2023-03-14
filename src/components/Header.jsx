import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1> 
                    <Link to={'/'} className="text-light">Inventario</Link>
                </h1>
            </div>

            <Link
                className="btn btn-danger nuevo-post d-block"
                to={'/productos/nuevo'}>Agregar Producto &#43;
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/productos/nuevoproveedor'}>Agregar Proveedor &#43;
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/productos/nuevocliente'}>Agregar Cliente &#43;
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/compra'}>Agregar Compra &#43;
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/venta'}>Agregar Venta &#43;
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/productos/import'}>Importar &#43;
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/proveedores'}>Proveedores
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/clientes'}>Clientes
            </Link>
            {/* <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/'}>Productos
            </Link> */}
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/ventas'}>Ventas
            </Link>
            <Link
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                to={'/compras'}>Compras
            </Link>
        </nav>

     );
}
 
export default Header;