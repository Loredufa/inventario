import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Actions de Redux
import { crearNuevoClienteAction } from '../actions/productoActions';
import { mostrarAlertaAction , ocultarAlertaAction } from '../actions/alertaActions';

const NuevoCliente = () => {
    
    //State del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ direccion, guardarDireccion] = useState('');
    const [ telefono, guardarTelefono ] = useState('');
    const [ whatsapp, guardarWhatsapp ] = useState('');
    const [ mail, guardarMail] = useState('');
    const [ web, guardarWeb ] = useState('');
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.error);
    const alerta = useSelector ( state => state.alerta.alerta);

    const agregarCliente = cliente => dispatch( crearNuevoClienteAction(cliente));

    //Cuando el usuario haga submit
    const submitNuevoCliente = e => {
        e.preventDefault();

        //Validar formulario
        if(nombre.trim() === ''){
            
            const alerta = {
                msg : 'El nombre es obligatorio',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch ( mostrarAlertaAction(alerta) );
            return;
        }
        //Si no hay errores
        dispatch ( ocultarAlertaAction() );
        //Crear el nuevo producto
        agregarCliente({
            nombre,
            direccion,
            telefono,
            whatsapp,
            mail,
            web
        });

        //redireccionar al home
        navigate('/clientes');
    }    
    
    
    return ( 
        <div className=" row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Cliente
                        </h2>

                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }

                        <form
                            onSubmit={submitNuevoCliente}
                        >
                            <div className="form-group">
                                <label>Nuevo Cliente</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Cliente"
                                    name="nombreCliente"
                                    value={nombre}
                                    onChange= {e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Direccion</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Domicilio completo"
                                    name="direccionCliente"
                                    value={direccion}
                                    onChange= {e => guardarDireccion(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese el número"
                                    name="telefonoCliente"
                                    value={telefono}
                                    onChange= {e => guardarTelefono(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Whatsapp</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese el número"
                                    name="whatsappCliente"
                                    value={whatsapp}
                                    onChange= {e => guardarWhatsapp(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>eMail</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección de mail"
                                    name="mailCliene"
                                    value={mail}
                                    onChange= {e => guardarMail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Páqgina web</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección web"
                                    name="webCliente"
                                    value={web}
                                    onChange= {e => guardarWeb(e.target.value)}
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
 
export default NuevoCliente;