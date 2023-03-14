import React , { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './styles/NuevaCompra.css'
// Actions de Redux
import { obtenerClientesAction, editarProductoAction} from '../actions/productoActions';
import { postSale, postMove} from '../actions/logicActions';
import Venta from './Venta';

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
    const [ fechaEntrega, guardarFechaEntrega ] = useState('');
    const [ nombreCliente, guardarNombreCliente ] = useState('');
    const [rows, setRows] = useState([defaultState]);
    

    const guardarTotal = rows.map((e) => e.cantidad).reduce((a, b) => a + b, 0) 
  
    const guardarPesos = rows.map((e) => e.cantidad*e.precio).reduce((a, b) => a + b, 0)
   
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);
    const producto = useSelector ( state => state.productos.productos);
    const clientes = useSelector ( state => state.productos.clientes);
    
    
    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
        ...copyRows[index],
        [name]: value
        };
        setRows(copyRows);
        console.log('COPYROW = ' + JSON.stringify(copyRows))
    }
    const handleOnAdd = () => {
        setRows(rows.concat(defaultState));
    };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
    };
    
    const cliente = clientes.filter(e => e.nombre === nombreCliente)

    const registrarMovimiento = () => {
        rows.map((e) => {
            dispatch(postMove({fecha,
                                producto : e.nombre,
                                cantidad: ` -${e.cantidad}`, 
                                precio: e.precio}))
            const product = producto.filter(elem => e.nombre === elem.nombre)

            //console.log('PRODUCT = ' + JSON.stringify(product))
            dispatch(editarProductoAction({nombre : e.nombre,
                            id: product[0].id,
                            cantidad: Number(product[0].cantidad) - Number(e.cantidad), 
                            providerId: product[0].providerId}))
        })
        dispatch(postSale({fecha,
            fecha_entrega: fechaEntrega,
            monto: guardarPesos,
            piezas: guardarTotal,
            customerId: cliente[0].id }))     
        //redireccionar
        navigate('/venta');   
        
    };



    //Cuando el usuario haga submit
    const submitNuevaCompra = e => {
        e.preventDefault();
        }

    useEffect(() => {
        dispatch(obtenerClientesAction())
    },[dispatch])
       
    return ( 
        <div className=" row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Nueva venta
                        </h2>

                        <form 
                            onSubmit={submitNuevaCompra}
                        >

                            <div className='formInLine'>
                            
                                <label>Fecha</label>
                                <input 
                                    type="date"
                                    key='fecha'
                                    min="2023-01-01" max="2050-12-31"
                                    name="fecha"
                                    value={fecha}
                                    onChange= {(e) => {guardarFecha (e.target.value); }}
                                />
                                
                                <label>Cliente</label>
                                <Select
                                    isClearable  
                                    className="basic-single Input_medium"
                                    options= {clientes.map((e) => ({label:e.nombre, value:e.nombre}))}
                                    onChange={e => 
                                        !e? guardarNombreCliente('') : guardarNombreCliente(e.value)}
                                />
                                
                            </div>
                            {rows.map((row, index) => (
                                <Venta
                                {...row}
                                onChange={(name, value) => handleOnChange(index, name, value)}
                                onRemove={() => handleOnRemove(index)}
                                key={index}
                                />
                            ))}
                            
                            <button
                                className="btn btn-primary font-wiight-bold text-uppercase d-block w-10"
                                onClick={handleOnAdd}
                            >+</button>

                            <div className='formInLine totales'>
                            <label>Fecha Entrega</label>
                                <input 
                                    type="date"
                                    key='fechaEntrega'
                                    min="2023-01-01" max="2050-12-31"
                                    placeholder="Codigo del Producto para el proveedor"
                                    name="fechaEntrega"
                                    value={fechaEntrega}
                                    onChange= {(e) => {guardarFechaEntrega (e.target.value); }}
                                />
                                
                                <label className='label-totales'>Total Piezas</label>
                                
                                <input 
                                    type="text"
                                    key='piezas'
                                    className="input_small"
                                    name="piezas"
                                    value={guardarTotal}       
                                    //onChange= {e => guardarFecha (e.target.value)}                        
                                />

                                <label className='label-totales'>Total $$$</label>
                                <input 
                                    type="text"
                                    key='totalCompra'
                                    className="input_small"
                                    name="totalCompra"
                                    value={guardarPesos}
                                    //onChange= {e => guardarFecha (e.target.value)}
                                />
                            </div>
                           <button
                                type='submit'
                                disabled={!nombreCliente || !fecha}
                                className="btn btn-primary font-wiight-bold text-uppercase d-block w-100"
                                onClick={registrarMovimiento}
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