import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import { postList, editarProductoList } from '../actions/productoActions';


const Import = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});

  const allProduct= useSelector(state => state.productos.productos);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };
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
    <label className="text-center mb-4 font-weight-bold">Importar productos del proveedor</label><br/>
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
      <button onClick={save}>
          Guardar
      </button>
    </>
  );
}

export default Import;