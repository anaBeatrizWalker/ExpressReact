import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Button } from 'react-bootstrap'
import '../estilos.css'

export default function ListaFuncionarios(){

    const [funcionarios, setFuncionarios] = useState([])

    useEffect(()=>{
        api_express.get('/funcionarios').then(resp => {
            setFuncionarios(resp.data.funcionarios)
        })
    }, [])

    return (
        <div className='detalhes'>

            <h1>Lista dos funcionários</h1>

            <Link className='btn btn-success' to="/funcionarios/novo">Adicionar funcionário</Link>

            {funcionarios.map(funcionario => { 
                return (
                    <ListGroup className='margin-top'>
                        <ListGroup.Item key={funcionario.id}>
                            <Link to={`/funcionarios/${funcionario.id}`}>{funcionario.nome}</Link>
                            <div className="d-flex justify-content-end">
                                <Button href={`/funcionarios/${funcionario.id}/editar`} variant="warning" className="p-2 bd-highlight buttons">Editar</Button>
                                <Button href={`/funcionarios/${funcionario.id}/deletar`} variant="danger" className="p-2 bd-highlight buttons">Deletar</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                )
            })}         
        </div>
    )
}