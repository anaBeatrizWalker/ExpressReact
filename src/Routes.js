import React from 'react'
import { Routes, Route } from 'react-router'

import Produtos from './components/Produtos'
import TiposProdutos from './components/TiposProdutos'
import Fornecedores from './components/Fornecedores'
import Enderecos from './components/Enderecos'
import Funcionarios from './components/Funcionarios'

export default function Rotas(){
    return (
        <Routes>
            <Route path='/produtos' element={<Produtos/>}></Route>
            <Route path='/tipos_produtos' element={<TiposProdutos/>}></Route>
            <Route path='/fornecedores' element={<Fornecedores/>}></Route>
            <Route path='/enderecos' element={<Enderecos/>}></Route>
            <Route path='/funcionarios' element={<Funcionarios/>}></Route>
        </Routes>
    )
}