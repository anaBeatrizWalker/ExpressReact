import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListGroup } from 'react-bootstrap'
import '../estilos.css'

export default function DadosFornecedor(){

    let {id} = useParams()
    const [fornecedor, setFornecedor] = useState({})

    useEffect(()=>{
        api_express.get(`/fornecedores/${id}`).then(resp => {
            setFornecedor(resp.data.fornecedor)
        })
    }, [id])

    return (
        <div className='detalhes'>

            <h1>Detalhes do fornecedor</h1>

            <ListGroup className='grupo-lista'>
                <ListGroup.Item>Código: {fornecedor.id}</ListGroup.Item>
                <ListGroup.Item>Nome: {fornecedor.nome}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}