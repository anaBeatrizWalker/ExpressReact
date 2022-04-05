import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Select from "react-select"
import '../estilos.css'
const moment = require('moment')

export default function AdicionaProduto(){

    let {id} = useParams()
    let navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [validade, setValidade] = useState("")
    const [tipo_produto_id, setTipoProdutoId] = useState([])
    const [fornecedor_id, setFornecedorId] = useState([])
    
    const [tipos_produto, setTipoProdutos] = useState({})
    const [fornecedores, setFornecedores] = useState({})

    const [nomeTipoProduto, setNomeTipoProduto] = useState("")
    const [nomeFornecedor, setNomeFornecedor] = useState("")

    useEffect(()=>{
        api_express.get('/tipos_produtos').then(resp => {
            let tiposProdutos = resp.data.tipos_produto
            setTipoProdutos(tiposProdutos)
        })

        api_express.get('/fornecedores').then(resp => {
            let fornec = resp.data.fornecedores
            setFornecedores(fornec)
        }) 
        if(id){
            api_express.get(`/produtos/${id}`).then(resp => {
                const produto = resp.data.produto
                setNome(produto.nome)
                setPreco(produto.preco) 
                setQuantidade(produto.quantidade)
                setValidade(formataData(produto.validade))
                setTipoProdutoId(produto.tipo_produto_id)
                setFornecedorId(produto.fornecedor_id)
            })
        }
    }, [id])

    useEffect(() => {
        for(let i = 0; i < tipos_produto.length; i++){
            tipos_produto[i].value = tipos_produto[i].id
            tipos_produto[i].label = tipos_produto[i].nome
        }
        for(let i = 0; i < fornecedores.length; i++){
            fornecedores[i].value = fornecedores[i].id
            fornecedores[i].label = fornecedores[i].nome
        }
        if(id){
            api_express.get(`/produtos/${id}`).then(resp => {
                const produto = resp.data.produto

                for(let i in tipos_produto){
                    if(tipos_produto[i].id === produto.tipo_produto_id){
                        setNomeTipoProduto(tipos_produto[i].nome)
                    }
                }
                for(let i in fornecedores){
                    if(fornecedores[i].id === produto.fornecedor_id){
                        setNomeFornecedor(fornecedores[i].nome)   
                    }
                }
            })
        }
    }, [id, tipos_produto, fornecedores, nomeTipoProduto, nomeFornecedor])

    async function addProduto(){
        const produto = { 
            nome: nome,
            preco: preco,
            quantidade: quantidade,
            validade: validade,
            tipo_produto_id: validarIdTipo(tipo_produto_id.id),
            fornecedor_id: validarIdFornecedor(fornecedor_id.id) 
        }
        if(id){ 
            api_express.put(`/produtos/${id}`, produto).then(resp => {
                console.log('put', resp.data)
                navigate('/produtos')
            }).catch((erro) => {
                console.log(erro)
            })
        }else{
            api_express.post('/produtos', produto).then(resp => { 
                console.log('post', resp.data)
                navigate('/produtos')
            }).catch((erro) => {
                console.log(erro)
            })
        }        
    }

    function formataData(dataInput) {
        let data_formata = moment(dataInput).format('YYYY-MM-DD')
        return data_formata
    }

    function validarIdTipo(id){
        if(id){
            return id
        }else{
            document.querySelector(".tipo_produto_id").classList.add('sinalizacao_erro')
            alert("Atualize ou selecione o campo Tipo de Produto")
            return false  
        }
    }

    function validarIdFornecedor(id){
        if(id){
            return id
        }else{
            document.querySelector(".fornecedor_id").classList.add('sinalizacao_erro')
            alert("Atualize ou selecione o campo Fornecedor")
            return false  
        } 
    }

    return (
        <div className='form'>

            {id ? <h1>Atualizar dados do produto</h1> : <h1>Cadastre um novo produto</h1>}
            
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
                    <Form.Label column sm="2">Tipo de Produto</Form.Label>
                    <Col sm="10">
                        <Select
                            className="tipo_produto_id" 
                            placeholder={id ? `${nomeTipoProduto}` : "Selecione a categoria"}
                            onChange={(e) => setTipoProdutoId(e)}
                            options={tipos_produto}>
                        </Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="fornecedor_id">
                    <Form.Label column sm="2">Fornecedor</Form.Label>
                    <Col sm="10">
                        <Select 
                            className="fornecedor_id"
                            placeholder={id ? `${nomeFornecedor}` : "Selecione a categoria"}
                            onChange={(e) => setFornecedorId(e)}
                            options={fornecedores}>
                        </Select>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button className="btn btn-success" onClick={() => addProduto()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}