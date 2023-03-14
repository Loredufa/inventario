import React , { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { obtenerProductosAction } from '../actions/productoActions';

import './styles/NuevaCompra.css'

const Venta= ({ onChange, onRemove, nombre, codigo_barras, cantidad, precio, total_producto }) => {
    const [isProduct, setIsProduct] = useState(true);

    const productos = useSelector ( state => state.productos.productos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(obtenerProductosAction())
    },[dispatch])

        return (
            <div className='formInLine'>
                                <input 
                                    type="text"
                                    key="codigo_poducto"
                                    className="Input_cb"
                                    placeholder="Cod de barra"
                                    name="codigo_poducto"
                                    value={codigo_barras}
                                    onChange={e => onChange("codigo_barras", e.target.value)}
                                /> 
                                <Select
                                    isClearable
                                    key='producto'
                                    className="basic-single Input_medium "
                                    options= {productos.map((e) => ({label:e.nombre, value:e.nombre}))}
                                    onChange={e => 
                                        {!e? onChange("nombre", '') : onChange("nombre", e.value); setIsProduct(false)}}
                                />
                                <input 
                                    type="nunber"
                                    disabled={isProduct}
                                    key='cantidad'
                                    className="input_small "
                                    placeholder="Cant"
                                    name="cantidad"
                                    value={cantidad}
                                    onChange={e => onChange("cantidad", Number(e.target.value))}
                                />
                                <input 
                                    type="number"
                                    key="pzas"
                                    className="input_small ref "
                                    name="pzas"
                                    placeholder="stock"
                                    defaultValue={productos.filter( e => (e.nombre===nombre? e.cantidad :'')).map((e) => e.cantidad)}
                                />
                                <input 
                                    type="number"
                                    disabled={isProduct}
                                    key="precio"
                                    className="input_small"
                                    placeholder="Precio"
                                    name="precio"
                                    value={precio || ''}
                                    onChange={e => onChange("precio",Number(e.target.value))}
                                />
                                <label>Total $</label>
                                <input 
                                    type="number"
                                    key='Total_producto'
                                    className="input_small ref"
                                    name="Total_producto"
                                    value={total_producto = precio*cantidad}
                                    onChange={e => onChange("total_producto", Number(e.target.value))}
                                />
                                <button 
                                className='btn btn-primary font-wiight-bold text-uppercase eliminar w-10'
                                onClick={onRemove}>-</button>
                            </div>
        )}

export default Venta;