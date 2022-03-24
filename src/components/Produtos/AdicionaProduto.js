import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Select from "react-select"
import '../estilos.css'

export default function AdicionaProduto(){

    let {id} = useParams()

    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [validade, setValidade] = useState("")
    const [tipo_produto_id, setTipoProdutoId] = useState([])
    const [tipos_produto, setTipoProdutos] = useState({})
    const [fornecedor_id, setFornecedorId] = useState([])
    const [fornecedores, setFornecedores] = useState({})

    useEffect(()=>{
        if(id){
            api_express.get(`/produtos/${id}`).then(resp => {
                const produto = resp.data.produto
                console.log(produto)
                setNome(produto.nome)
                setPreco(produto.preco)
                setQuantidade(produto.quantidade)
                setValidade(formataData(produto.validade))
                setTipoProdutoId(produto.tipo_produto_id)
                //setTipoProdutos(RESGATA NOME)
                setFornecedorId(produto.fornecedor_id)
                //setFornecedores(RESGATA NOME)
            })
        }
        api_express.get('/tipos_produtos').then(resp => {
            setTipoProdutos(resp.data.tipos_produto)
        })
        api_express.get('/fornecedores').then(resp => {
            setFornecedores(resp.data.fornecedores)
        })
    }, [])

    useEffect(() => {
        function formataDados(){
            for(let i = 0; i < tipos_produto.length; i++){
                tipos_produto[i].value = tipos_produto[i].id
                tipos_produto[i].label = tipos_produto[i].nome                
            }

            for(let i = 0; i < fornecedores.length; i++){
                fornecedores[i].value = fornecedores[i].id
                fornecedores[i].label = fornecedores[i].nome
            }
        }
        formataDados()
        
    }, [tipos_produto, fornecedores])

    async function addProduto(){
        const produto = { 
                nome: nome, 
                preco: preco, 
                quantidade: quantidade, 
                validade: validade, 
                tipo_produto_id: tipo_produto_id.id,
                fornecedor_id: fornecedor_id.id
        }        
        if(id){ 
            api_express.put(`/produtos/${id}`, produto).then(resp => { console.log('put', resp.data) }) 
        }else{
            api_express.post('/produtos', produto).then(resp => { console.log('post', resp.data) }) 
        }        
    }

    function formataData(validade){
        let data = new Date(validade)
        let dataFormatada = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + ((data.getDate() ))
        return dataFormatada
    }

    return (
        <div className='form'>

            <h1>Cadastre um novo produto</h1>
            
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Nome</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="preco">
                    <Form.Label column sm="2">Preço</Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="quantidade">
                    <Form.Label column sm="2">Quantidade</Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="validade">
                    <Form.Label column sm="2">Validade</Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" name="validade" value={validade} onChange={(e) => setValidade(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="tipo_produto_id">
                    <Form.Label column sm="2">ID do Tipo de Produto</Form.Label>
                    <Col sm="10">
                        <Select 
                            type="number" name="tipo_produto_id"
                            placeholder={"Selecione uma categoria"} 
                            onChange={(e) => setTipoProdutoId(e)}
                            options={tipos_produto}>
                        </Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="fornecedor_id">
                    <Form.Label column sm="2">ID do Fornecedor</Form.Label>
                    <Col sm="10">
                        <Select 
                            type="number" name="fornecedor_id" 
                            placeholder={"Selecione um fornecedor"} 
                            onChange={(e) => setFornecedorId(e)}
                            options={fornecedores}>
                        </Select>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button href="/produtos" className="btn btn-success" onClick={() => addProduto()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}