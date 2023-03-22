import React , { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import { postList, editarProductoList, obtenerProveedoresAction } from '../actions/productoActions';


const Import = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [ nombreProveedor, guardarNombreProveedor ] = useState('');
  const [idProveedor, guardarIdProveedor] = useState('')

  console.log('NOMBRE PROVEEDR ' + nombreProveedor)

  const allProduct= useSelector(state => state.productos.productos);
  const proveedores = useSelector ( state => state.productos.proveedores);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(obtenerProveedoresAction())
},[dispatch])

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };
  
  const providerId = proveedores.filter((e) => 
    e.nombre === nombreProveedor
  )
  console.log ('PROVIDERID = '+providerId)

// save to database
  const save = () => {
      const result = generateObjects(currentSheet);
      const PutResult = []

      result.filter ((elem) => 
        allProduct.filter ((e) => {
          if (elem.nombre === e.nombre) {
            PutResult.push(elem)
          }
        })
      )

      const PostResult = result.filter((e) => !PutResult.includes(e))
      console.log('VOY A POST ' + PostResult)
      console.log('VOY A PUT ' + PutResult )

      const data = PutResult?.map ((e) =>    
      dispatch(editarProductoList (e)))

      const newData = PostResult?.map ((e) =>
        dispatch(postList (e))
      )

      setCurrentSheet({
        data, 
        newData
      })
    navigate('/');
}

  return (
    <>
      <label>Proveedor</label>
      <Select
          isClearable  
          placeholder='Selecciona un proveedor'
          className="basic-single Input_medium"
          options= {proveedores.map((e) => ({label:e.nombre, value:e.nombre}))}
          onChange={e => 
            !e? guardarNombreProveedor('') : guardarNombreProveedor(e.value)}
    />
    <label className="text-center mb-4 font-weight-bold">Importar lista del proveedor</label><br/>
      <input
        type='file'
        accept='.xlsx'
        onChange={handleUpload}
      />
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName='active-sheet'
        reactExcelClassName='react-excel'
      />
      <button disabled={!nombreProveedor} onClick={save}>
          Guardar
      </button>
    </>
  );
}

export default Import;