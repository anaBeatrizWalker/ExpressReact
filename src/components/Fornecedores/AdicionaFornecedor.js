import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import '../estilos.css'

export default function AdicionaFornecedor(){

    let {id} = useParams()
    let navigate = useNavigate()

    const [nome, setNome] = useState("")
    
    const [status, setStatus] = useState({ type: '', mensagem: '' })

    useEffect(()=>{
        if(id){
            api_express.get(`/fornecedores/${id}`).then(resp => {
                const fornecedor = resp.data.fornecedor
                setNome(fornecedor.nome)
            })
        }
    }, [id])

    async function addFornecedor(){
        const fornecedor = { nome: nome }

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
            api_express.put(`/fornecedores/${id}`, fornecedor).then(resp => {
                console.log('put', resp.data)
                navigate('/fornecedores')
            }).catch((erro) => {
                console.log(erro)
            })
        }else{
            api_express.post('/fornecedores', fornecedor).then(resp => {
                console.log('post', resp.data)
                navigate('/fornecedores')
            }).catch((erro) => {
                console.log(erro)
            })
        }        
    }

    function validarCampos(){
        if(!nome) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Nome!'})
    
        return true
    }

    return (
        <div className='form'>

            {id ? <h1>Atualizar fornecedor</h1> : <h1>Cadastre um fornecedor</h1>}

            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}
            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
            
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Nome</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button className="btn btn-success" onClick={() => addFornecedor()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}