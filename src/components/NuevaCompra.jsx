import React , { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/NuevaCompra.css'
// Actions de Redux
import { obtenerProveedoresAction, obtenerProductosAction } from '../actions/productoActions';
import { mostrarAlertaAction , ocultarAlertaAction } from '../actions/alertaActions';

import Compra from './Compra';

const NuevaCompra= () => {
    
    const defaultState = {
        codigo_barras: "",
        nombre: "",
        cantidad: "",
        precio: "",
        total_producto: ""

      };
    
    //State del componente
    const [ fecha, guardarFecha ] = useState('');
    const [ nombreProveedor, guardarNombreProveedor ] = useState('');
    const [ nombre, guardarNombreProducto ] = useState('');
    const [ codigo_barras, guardarCodigo ] = useState('');
    const [ cantidad, guardarCantidad ] = useState('');
    const [ piezas, guardarTotalPiezas] = useState('');
    const [ precio, guardarPrecio] = useState('');
    const [ totalCompra, guardarTotalCompra] = useState('');
    const [rows, setRows] = useState([defaultState]);
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);
    const alerta = useSelector ( state => state.alerta.alerta);
    const proveedores = useSelector ( state => state.productos.proveedores);
    const productos = useSelector ( state => state.productos.productos);

    //const agregarCompra = compra => dispatch( crearNuevaCompraAction(compra));
    
    useEffect(() => {
        dispatch(obtenerProveedoresAction())
        dispatch(obtenerProductosAction())
    },[dispatch])

    //Cuando el usuario haga submit
    const submitNuevaCompra = e => {
        e.preventDefault();

        //Validar formulario
        // if(nombreProveedor.trim() === '' || nombre.trim() === ''){
            
        //     const alerta = {
        //         msg : 'Debe completar los campos obligatorios',
        //         classes: 'alert alert-danger text-center text-uppercase p3'
        //     }
        //     dispatch ( mostrarAlertaAction(alerta) );
        //     return;
        // }
        //Si no hay errores
        dispatch ( ocultarAlertaAction() );
        //Crear el nuevo producto
        //agregarCompra({
         //   nombreProveedor,
         //   nombreProducto,
         //   codigo_barras,
         //   cantidad,
          //  precio_compra,
         //   totalCompra
       // });

        //redireccionar al home
        //navigate('/');
    }    
    function obtenerNombreProveedor (e) {
        guardarNombreProveedor(e.target.value)  
    }

    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
        ...copyRows[index],
        [name]: value
        };
        setRows(copyRows);
        //console.log('SOY COPYROWS ' + JSON.stringify(copyRows) )
    }
    const handleOnAdd = () => {
        setRows(rows.concat(defaultState));
    };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
    };


    return ( 
        <div className=" row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Nueva compra
                        </h2>

                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }

                        <form 
                            onSubmit={submitNuevaCompra}
                        >

                            <div className='formInLine'>
                            
                                <label>Fecha</label>
                                <input 
                                    type="date"
                                    min="2023-01-01" max="2050-12-31"
                                    className="input_small"
                                    placeholder="Codigo del Producto para el proveedor"
                                    name="fecha"
                                    value={fecha}
                                    onChange= {e => guardarFecha (e.target.value)}
                                />
                            
                                <label>Proveedor</label>
                                <select  className="select Input_medium"
                                onChange= {e => obtenerNombreProveedor(e)}>
                                    <option >Elije el proveedor</option>
                                    {proveedores.map((tem) => (
                                        <option value={tem.nombre}>{tem.nombre}</option>
                                            ))}
                                    </select>
                            </div>
                            {rows.map((row, index) => (
                                <Compra
                                {...row}
                                onChange={(name, value) => handleOnChange(index, name, value)}
                                onRemove={() => handleOnRemove(index)}
                                key={index}
                                />
                            ))}
                            <button
                                type="submit" 
                                className="btn btn-primary font-wiight-bold text-uppercase d-block w-10"
                                onClick={handleOnAdd}
                            >+</button>

                            <div className='formInLine totales'>
                                <label className='label-totales'>Total Piezas</label>
                                
                                <input 
                                    type="text"
                                    className="input_small"
                                    name="Total piezas"
                                    value={rows.map((e) => e.cantidad).reduce((a, b) => a + b, 0)}
                                    onChange= {e => guardarTotalPiezas(e.target.value)}
                                />

                                <label className='label-totales'>Total $$$</label>
                                <input 
                                    type="text"
                                    className="input_small"
                                    name="Total pesos"
                                    value={rows.map((e) => e.cantidad*e.precio).reduce((a, b) => a + b, 0) }
                                    onChange= {e => guardarTotalCompra (e.target.value)}
                                />
                            </div>
                           <button
                                type="submit" 
                                className="btn btn-primary font-wiight-bold text-uppercase d-block w-100"
                            >Agregar compra</button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null}
                        { error ? <p className=" alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default NuevaCompra;