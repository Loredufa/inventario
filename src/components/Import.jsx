import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import { postList } from '../actions/productoActions';


const Import = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});

  const dispatch = useDispatch();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  const save = () => {
    //console.log('Hola soy ' + currentSheet)
    const result = generateObjects(currentSheet);
    const data = result.map(e => dispatch(postList (e)))
    //dispatch(postList (currentSheet))
    console.log('Hola soy data '+ data)
    setCurrentSheet({
      data
    })
    //save array of objects to backend
    //fetch('http://localhost:4000/api/productos', {
    //    method: 'POST',
    //    body: JSON.stringify(result)
    //});

}
  return (
    <>
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
          Save to API
      </button>
    </>
  );
}

export default Import;