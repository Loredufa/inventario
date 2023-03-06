import React from 'react';
import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NuevoProveedor from './components/NuevoProveedor';
import Proveedores from './components/Proveedores';
import NuevoCliente from './components/NuevoCliente';
import Clientes from './components/Clientes';
import Import from './components/Import';
import NuevaCompra from './components/NuevaCompra';


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Productos/>} />
            <Route path="/proveedores" element={<Proveedores/>} />
            <Route path="/clientes" element={<Clientes/>} />
            <Route path="/productos/nuevo" element={<NuevoProducto/>} />
            <Route path="/productos/nuevoproveedor" element={<NuevoProveedor/>} />
            <Route path="/productos/nuevocliente" element={<NuevoCliente/>} />
            <Route path="/productos/editar/:id" element={<EditarProducto/>} />
            <Route path="/productos/import" element={<Import/>} />
            <Route path="/compra" element={<NuevaCompra/>} />
          </Routes>
        </div>
    </BrowserRouter>
   
  );
}

export default App;
