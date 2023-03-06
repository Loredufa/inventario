import React from 'react';

import './styles/NuevaCompra.css'

const Compra= ({ onChange, onRemove, nombre, codigo_barras, cantidad, precio, total_producto }) => {

        return (
            <div className='formInLine'>
                                <input 
                                    type="text"
                                    className="Input_cb"
                                    placeholder="Cod de barra"
                                    name="codigo_poducto"
                                    value={codigo_barras}
                                    onChange={e => onChange("codigo_barras", e.target.value)}
                                />
                                <input 
                                    type="text"
                                    className=""
                                    placeholder="Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => onChange("nombre", e.target.value)}
                                />
                                <input 
                                    type="nunber"
                                    className="input_small"
                                    placeholder="Cant"
                                    name="cantidad"
                                    value={cantidad}
                                    onChange={e => onChange("cantidad", Number(e.target.value))}
                                />
                                <input 
                                    type="number"
                                    className="input_small ref "
                                    name="$ref"
                                    placeholder="$ref"
                                />
                                <input 
                                    type="number"
                                    className="input_small"
                                    placeholder="Precio"
                                    name="precioCompra"
                                    value={precio || ''}
                                    onChange={e => onChange("precio",Number(e.target.value))}
                                />
                                <label>Total $</label>
                                <input 
                                    type="number"
                                    className="input_small ref"
                                    name="Total producto"
                                    value={total_producto = precio*cantidad}
                                    onChange={e => onChange("total_producto", Number(e.target.value))}
                                />
                                <button 
                                className='btn btn-primary font-wiight-bold text-uppercase eliminar w-10'
                                onClick={onRemove}>-</button>
                            </div>
        )}

export default Compra;