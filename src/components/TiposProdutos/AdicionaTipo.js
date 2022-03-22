import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'

export default function AdicionaTipoProduto(){

    let {id} = useParams()

    const [nome, setNome] = useState("")

    useEffect(()=>{
        if(id){
            api_express.get(`/tipos_produtos/${id}`).then(resp => {
                const tipo_produto = resp.data.tipo_produto
                setNome(tipo_produto.nome)
            })
        }
    }, [id])

    async function addTipoProduto(){
        const tipo_produto = { nome: nome }
        if(id){ 
            api_express.put(`/tipos_produtos/${id}`, { tipo_produto }).then(resp => { console.log('put', resp.data) }) 
        }else{
            api_express.post('/tipos_produtos', { tipo_produto }).then(resp => { console.log('post', resp.data) }) 
        }        
    }

    return (
        <div style={{width: '75%', marginTop: '20px'}}>

            <h1>Cadastre um novo tipo de produto</h1>
            
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Nome</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button href="/tipos_produtos" className="btn btn-success" onClick={() => addTipoProduto()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}