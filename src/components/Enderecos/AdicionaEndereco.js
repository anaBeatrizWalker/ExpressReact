import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Select from "react-select"
import '../estilos.css'

export default function AdicionaEndereco(){

    let {id} = useParams()
    let navigate = useNavigate()

    const [fornecedor_id, setFornecedorId] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [cep, setCep] = useState("")
    const [fornecedores, setFornecedores] = useState({})

    const [nomeFornecedor, setNomeFornecedor] = useState("")

    const [status, setStatus] = useState({ type: '', mensagem: '' })

    useEffect(()=>{
        api_express.get('/fornecedores').then(resp => {
            setFornecedores(resp.data.fornecedores)
        })
        if(id){
            api_express.get(`/enderecos/${id}`).then(resp => {
                const endereco = resp.data.endereco
                setLogradouro(endereco.logradouro)
                setComplemento(endereco.complemento)
                setCidade(endereco.cidade)
                setEstado(endereco.estado)
                setCep(endereco.cep)
            })
        }
    }, [id])

    useEffect(() => {
        for(let i = 0; i < fornecedores.length; i++){
            fornecedores[i].value = fornecedores[i].id
            fornecedores[i].label = fornecedores[i].nome
        }
        if(id){
            api_express.get(`/enderecos/${id}`).then(resp => {
                const endereco = resp.data.endereco

                for(let i in fornecedores){
                    if(fornecedores[i].id === endereco.fornecedor_id){
                        setNomeFornecedor(fornecedores[i].nome)
                    }
                }
            })
        }
    }, [id, fornecedores, setNomeFornecedor])

    async function addEndereco(){
        const endereco = { 
            fornecedor_id: fornecedor_id.id,
            logradouro: logradouro,
            complemento: complemento,
            cidade: cidade,
            estado: estado,
            cep: cep 
        }
        console.log(endereco)
        if(!validarCampos()) return
        const saveDataForm = true
        if (saveDataForm) {
          setStatus({
            type: 'success',
            mensagem: "Usuário cadastrado com sucesso!"
          })
        } else {
          setStatus({
            type: 'error',
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
          })
        }

        if(id){ 
            api_express.put(`/enderecos/${id}`, endereco).then(resp => {
                console.log('put', resp.data)
                navigate('/enderecos')
            }).catch((erro) => {
                console.log(erro)
            })
        }else{
            api_express.post('/enderecos', endereco).then(resp => {
                console.log('post', resp.data)
                navigate('/enderecos')
            }).catch((erro) => {
                console.log(erro)
            })
        }        
    }

    function validarCampos(){
        if(!fornecedor_id) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Fornecedor!'})
        if(!logradouro) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Logradouro!'})
        if(!cidade) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Cidade!'})
        if(!estado) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo tipo do Estado!'})
        if(!cep) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo CEP!'})
    
        return true
    }

    return (
        <div className='form'>

            {id ? <h1>Atualizar endereço</h1> : <h1>Cadastre um endereço de um fornecedor</h1>}

            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}
            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
            
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Fornecedor</Form.Label>
                    <Col sm="10">
                        <Select
                            className="fornecedor_id" 
                            placeholder={id ? `${nomeFornecedor}` : "Selecione o fornecedor"}
                            onChange={(e) => setFornecedorId(e)}
                            options={fornecedores}>
                        </Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Logradouro</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Complemento</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Cidade</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Estado</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}/>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">CEP</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" max={'11'} name="cep" value={cep} onChange={(e) => setCep(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button className="btn btn-success" onClick={() => addEndereco()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}