import {
    AGREGAR,
    AGREGAR_EXITO,
    AGREGAR_ERROR,
    COMENZAR_DESCARGA,
    DESCARGA_EXITO,
    DESCARGA_PROVEEDOR_EXITO,
    DESCARGA_CIENTE_EXITO,
    DESCARGA_VENTAS_EXITO,
    DESCARGA_COMPRAS_EXITO,
    DESCARGA_ERROR,
    OBTENER_ELIMINAR,
    ELIMINADO_EXITO,
    ELIMINADO_ERROR,
    OBTENER_EDITAR,
    COMENZAR_EDICION,
    EDITADO_EXITO,
    EDITADO_ERROR
} from '../types';
//Cada reducer tiene su propio state

const initialState = {
    productos: [],
    proveedores: [],
    clientes: [],
    ventas: [],
    compras:[],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null,
    compras:[]
}

export default function (state = initialState, action ) {
    switch(action.type){
        case COMENZAR_DESCARGA:
        case 'POST_LIST' :
            return {
                ...state,
            }
        case AGREGAR : 
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_EXITO:
            return{
                ...state,
                loading:false,
                productos: [...state.productos,action.payload]
            }
        case AGREGAR_ERROR:
        case DESCARGA_ERROR:
        case ELIMINADO_ERROR:
        case EDITADO_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case DESCARGA_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload,
                
            }
            case DESCARGA_PROVEEDOR_EXITO:
                return{
                    ...state,
                    loading: false,
                    error: null,
                    proveedores: action.payload,
                    
                }
            case DESCARGA_CIENTE_EXITO:
                return{
                    ...state,
                    loading: false,
                    error: null,
                    clientes: action.payload,
                        
            }
            case DESCARGA_VENTAS_EXITO:
                return{
                    ...state,
                    loading: false,
                    error: null,
                    ventas: action.payload,
                        
            }
            case DESCARGA_COMPRAS_EXITO:
                return{
                    ...state,
                    loading: false,
                    error: null,
                    compras: action.payload,
                        
            }
        case OBTENER_ELIMINAR:
            return{
                ...state,
                productoeliminar: action.payload,
            }
        case ELIMINADO_EXITO:
            return{
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar:null
            }
        case OBTENER_EDITAR:
            return{
                ...state,
                productoeditar: action.payload
            }
        case COMENZAR_EDICION:
            return{
                ...state
            }        
        case EDITADO_EXITO:
            return{
                ...state,
                productoeditar: null,
                productos: state.productos.map( producto => //si el producto que estamos iterando su id es igual al id que estamos pasando por el action
                    producto.id === action.payload.id ? producto = action.payload // entonces el producto actual le asignamos el producto del action que editamos
                    : producto // caso contrario me retorna el producto  
                )
            }
        default:
            return state;
    }
}