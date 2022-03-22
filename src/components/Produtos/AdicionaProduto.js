import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api_express from '../../config/api_express'

import { Form, Row, Col, Button } from 'react-bootstrap'

export default function AdicionaProduto(){

    let {id} = useParams()

    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [validade, setValidade] = useState("")
    const [tipo_produto_id, setTipoProdutoId] = useState("")
    const [fornecedor_id, setFornecedorId] = useState("")

    useEffect(()=>{
        if(id){
            api_express.get(`/produtos/${id}`).then(resp => {
                const produto = resp.data.produto
                setNome(produto.nome)
                setPreco(produto.preco)
                setQuantidade(produto.quantidade)
                setValidade(produto.validade)
                setTipoProdutoId(produto.tipo_produto_id)
                setFornecedorId(produto.fornecedor_id)
            })
        }
    }, [id])

    async function addProduto(){
        const produto = { 
            nome: nome, 
            preco: preco, 
            quantidade: quantidade, 
            validade: validade, 
            tipo_produto_id: tipo_produto_id, 
            fornecedor_id: fornecedor_id 
        }
        if(id){ 
            api_express.put(`/produtos/${id}`, { produto }).then(resp => { console.log('put', resp.data) }) 
        }else{
            api_express.post('/produtos', { produto }).then(resp => { console.log('post', resp.data) }) 
        }        
    }

    return (
        <div style={{width: '75%', marginTop: '20px'}}>

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
                        <Form.Control type="number" name="tipo_produto_id" value={tipo_produto_id} onChange={(e) => setTipoProdutoId(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="fornecedor_id">
                    <Form.Label column sm="2">ID do Fornecedor</Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name="fornecedor_id" value={fornecedor_id} onChange={(e) => setFornecedorId(e.target.value)}/>
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