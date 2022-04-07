import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Form, Row, Col, Button } from 'react-bootstrap'
import '../estilos.css'

export default function AdicionaFuncionario(){

    let {id} = useParams()
    let navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [cargo, setCargo] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")

    const [status, setStatus] = useState({ type: '', mensagem: '' })

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
            api_express.put(`/funcionarios/${id}`, funcionario).then(resp => {
                console.log('put', resp.data)
                navigate('/funcionarios')
            }).catch((erro) => {
                console.log(erro)
            })
        }else{
            api_express.post('/funcionarios', funcionario).then(resp => {
                console.log('post', resp.data)
                navigate('/funcionarios')
            }).catch((erro) => {
                console.log(erro)
            })
        }        
    }

    function validarCampos(){
        if(!nome) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Nome!'})
        if(!cargo) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Cargo!'})
        if(!telefone) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Telefone!'})
        if(!email) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo E-mail!'})
    
        return true
    }

    return (
        <div className='form'>

            {id ? <h1>Atualizar funcionário</h1> : <h1>Cadastre um funcionário</h1>}

            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}
            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
            
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
                    <div className="d-flex justify-content-end">
                        <Button className="p-2 bd-highlight btn-success buttons" onClick={() => addFuncionario()}>
                            Salvar
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}