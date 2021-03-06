import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListGroup } from 'react-bootstrap'
import '../estilos.css'

export default function DadosFuncionario(){

    let {id} = useParams()
    const [funcionario, setFuncionario] = useState({})

    useEffect(()=>{
        api_express.get(`/funcionarios/${id}`).then(resp => {
            setFuncionario(resp.data.funcionario)
        })
    }, [id])

    return (
        <div className='detalhes'>

            <h1>Detalhes do funcionário</h1>

            <ListGroup className='grupo-lista'>
                <ListGroup.Item>Código: {funcionario.id}</ListGroup.Item>
                <ListGroup.Item>Nome: {funcionario.nome}</ListGroup.Item>
                <ListGroup.Item>Cargo: {funcionario.cargo}</ListGroup.Item>
                <ListGroup.Item>Telefone: {funcionario.telefone}</ListGroup.Item>
                <ListGroup.Item>E-mail: {funcionario.email}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}