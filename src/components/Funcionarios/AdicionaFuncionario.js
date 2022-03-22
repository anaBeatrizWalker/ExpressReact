import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'

export default function AdicionaFuncionario(){

    let {id} = useParams()

    const [nome, setNome] = useState("")
    const [cargo, setCargo] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")

    useEffect(()=>{
        if(id){
            api_express.get(`/funcionarios/${id}`).then(resp => {
                const funcionario = resp.data.funcionario
                setNome(funcionario.nome)
                setCargo(funcionario.cargo)
                setTelefone(funcionario.telefone)
                setEmail(funcionario.email)
            })
        }
    }, [id])

    async function addFuncionario(){
        const funcionario = { 
            nome: nome,
            cargo: cargo,
            telefone: telefone,
            email: email
        }
        if(id){ 
            api_express.put(`/funcionarios/${id}`, { funcionario }).then(resp => { console.log('put', resp.data) }) 
        }else{
            api_express.post('/funcionarios', { funcionario }).then(resp => { console.log('post', resp.data) }) 
        }        
    }

    return (
        <div style={{width: '75%', marginTop: '20px'}}>

            <h1>Cadastre um funcionário</h1>
            
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Nome</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Cargo</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">Telefone</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" max={11} name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="nome">
                    <Form.Label column sm="2">E-mail</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button href="/funcionarios" className="btn btn-success" onClick={() => addFuncionario()}>
                        Salvar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}