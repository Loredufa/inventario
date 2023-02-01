import React , { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); // habilitar navigate para redireccion


    // Nuevo state de producto
    const [ producto, guardarProducto ] = useState({
        codigo_barras: '',
        nombre:'',
        descripcion: '',
        precio_compra: '',
        precio_venta: ''
    });

    

    const productoeditado = useSelector( state => state.productos.productoeditar);

    //llenar el state
    useEffect(() => {
        guardarProducto(productoeditado);
    }, [productoeditado]);

    //Leer los datos del formulario
    const onChangeFormulario =  e => {
        guardarProducto({
            ...producto,
            [e.target.codigo_barras]: e.target.value,
            [e.target.name]: e.target.value,
            [e.target.descripcion]: e.target.value,
            [e.target.precio_compra]: e.target.value,
            [e.target.precio_venta]: e.target.value
        })
    }
    console.log(producto)
    
    const { codigo_barras,nombre , descripcion, precio_compra, precio_venta } = producto;

    

    const submitEditarProducto = e => {
        e.preventDefault();

       dispatch( editarProductoAction(producto) );
       navigate(`/`);
    }
    return ( 
        <div className=" row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form onSubmit = {submitEditarProducto}>
                            <div className="form-group">
                                <label>Codigo de barras</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa el código"
                                    name="nombrecodigo"
                                    value={codigo_barras}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Descripción Producto"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio de compra</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio de compra"
                                    name="precio_compra"
                                    value={precio_compra}
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button
                                type="submit" 
                                className="btn btn-primary font-wiight-bold text-uppercase d-block w-100">
                                    Guarda Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;