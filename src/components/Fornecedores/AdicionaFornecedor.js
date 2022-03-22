import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'

export default function AdicionaFornecedor(){

    let {id} = useParams()
    const [nome, setNome] = useState("")

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
        if(id){ 
            api_express.put(`/fornecedores/${id}`, { fornecedor }).then(resp => { console.log('put', resp.data) }) 
        }else{
            api_express.post('/fornecedores', { fornecedor }).then(resp => { console.log('post', resp.data) }) 
        }        
    }

    return (
        <div style={{width: '75%', marginTop: '20px'}}>

            <h1>Cadastre um fornecedor</h1>
            
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Nome</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button href="/fornecedores" className="btn btn-success" onClick={() => addFornecedor()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}