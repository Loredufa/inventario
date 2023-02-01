import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlertaAction , ocultarAlertaAction } from '../actions/alertaActions';

const NuevaCompra= () => {
    
    //State del componente
    const [ nombreProveedor, guardarNombreProveedor ] = useState('');
    const [ nombreProducto, guardarNombreProducto ] = useState('');
    const [ codigo_barras, guardarCodigo ] = useState('');
    const [ cantidad, guardarCantidad] = useState('');
    const [ precio_compra, guardarPrecioCompra ] = useState('');
    const [ totalCompra, guardarTotalCompra] = useState('');
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);
    const alerta = useSelector ( state => state.alerta.alerta);

    const agregarCompra = compra => dispatch( crearNuevaCompraAction(compra));

    //Cuando el usuario haga submit
    const submitNuevaCompra = e => {
        e.preventDefault();

        //Validar formulario
        if(nombreProveedor.trim() === '' || precio_compra <= 0 || cantidad <=0 || nombreProducto.trim() === ''){
            
            const alerta = {
                msg : 'Debe completar los campos obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch ( mostrarAlertaAction(alerta) );
            return;
        }
        //Si no hay errores
        dispatch ( ocultarAlertaAction() );
        //Crear el nuevo producto
        agregarCompra({
            nombreProveedor,
            nombreProducto,
            codigo_barras,
            cantidad,
            precio_compra,
            totalCompra
        });

        //redireccionar al home
        navigate('/');
    }    
    
    
    return ( 
        <div className=" row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nuevo Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange= {e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Codigo de barras</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="codigo Producto"
                                    name="codigo"
                                    value={codigo_barras}
                                    onChange= {e => guardarCodigo(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción del producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="descripción Producto"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange= {e => guardarDescripcion(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Costo del Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio de compra"
                                    name="precio"
                                    value={precio_compra}
                                    onChange= {e => guardarPrecioCompra(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio de venta</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio de venta"
                                    name="precio_venta"
                                    value={precio_venta}
                                    onChange= {e => guardarPrecioVenta(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Proveedor</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Proveedor"
                                    name="ProductoProveedor"
                                    value={providerId}
                                    onChange= {e => guardarProveedor(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit" 
                                className="btn btn-primary font-wiight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null}
                        { error ? <p className=" alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevaCompra;