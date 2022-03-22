import React from 'react'
import { Routes, Route } from 'react-router'

import ListaProdutos from './components/Produtos/ListaProdutos'
import DadosProduto from './components/Produtos/DadosProduto'
import AdicionaProduto from './components/Produtos/AdicionaProduto'
import DeletarProduto from './components/Produtos/DeletarProduto'

import ListarTiposProdutos from './components/TiposProdutos/ListaTiposProdutos'
import DadosTipoProduto from './components/TiposProdutos/DadosTipo'
import AdicionaTipoProduto from './components/TiposProdutos/AdicionaTipo'
import DeletarTipoProduto from './components/TiposProdutos/DeletarTipo'

import ListaFornecedores from './components/Fornecedores/ListaFornecedores'
import DadosFornecedor from './components/Fornecedores/DadosFornecedor'
import AdicionaFornecedor from './components/Fornecedores/AdicionaFornecedor'
import DeletarFornecedor from './components/Fornecedores/DeletarFornecedor'

import ListaEnderecos from './components/Enderecos/ListaEnderecos'
import DadosEndereco from './components/Enderecos/DadosEndereco'
import AdicionaEndereco from './components/Enderecos/AdicionaEndereco'
import DeletarEndereco from './components/Enderecos/DeletarEndereco'

import ListaFuncionarios from './components/Funcionarios/ListaFuncionarios'
import DadosFuncionario from './components/Funcionarios/DadosFuncionario'
import AdicionaFuncionario from './components/Funcionarios/AdicionaFuncionario'
import DeletarFuncionario from './components/Funcionarios/DeletarFuncionario'

export default function Rotas(){
    return (
        <Routes>
            {/* rotas dos produtos */}
            <Route path='/produtos' element={<ListaProdutos/>}></Route>
            <Route path='/produtos/:id' element={<DadosProduto/>}></Route>
            <Route path='/produtos/novo' element={<AdicionaProduto/>}></Route>
            <Route path='/produtos/:id/editar' element={<AdicionaProduto/>}></Route>   
            <Route path='/produtos/:id/deletar' element={<DeletarProduto/>}></Route>

            {/* tipos dos produtos */}
            <Route path='/tipos_produtos' element={<ListarTiposProdutos/>}></Route>
            <Route path='/tipos_produtos/:id' element={<DadosTipoProduto/>}></Route>
            <Route path='/tipos_produtos/novo' element={<AdicionaTipoProduto/>}></Route>
            <Route path='/tipos_produtos/:id/editar' element={<AdicionaTipoProduto/>}></Route>
            <Route path='/tipos_produtos/:id/deletar' element={<DeletarTipoProduto/>}></Route>

            {/* fornecedores */}
            <Route path='/fornecedores' element={<ListaFornecedores/>}></Route>
            <Route path='/fornecedores/:id' element={<DadosFornecedor/>}></Route>
            <Route path='/fornecedores/novo' element={<AdicionaFornecedor/>}></Route>
            <Route path='/fornecedores/:id/editar' element={<AdicionaFornecedor/>}></Route>
            <Route path='/fornecedores/:id/deletar' element={<DeletarFornecedor/>}></Route>

            {/* endereços */}
            <Route path='/enderecos' element={<ListaEnderecos/>}></Route>
            <Route path='/enderecos/:id' element={<DadosEndereco/>}></Route>
            <Route path='/enderecos/novo' element={<AdicionaEndereco/>}></Route>
            <Route path='/enderecos/:id/editar' element={<AdicionaEndereco/>}></Route>
            <Route path='/enderecos/:id/deletar' element={<DeletarEndereco/>}></Route>

        </Routes>
    )
}