import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListGroup } from 'react-bootstrap'

export default function DadosEndereco(){

    let {id} = useParams()
    const [endereco, setEndereco] = useState({})

    useEffect(()=>{
        api_express.get(`/enderecos/${id}`).then(resp => {
            setEndereco(resp.data.endereco)
        })
    }, [id])

    return (
        <div style={{marginTop: '20px'}}>

            <h1>Detalhes do endereço</h1>

            <ListGroup style={{marginTop: '20px'}}>
                <ListGroup.Item>Código: {endereco.id}</ListGroup.Item>
                <ListGroup.Item>Código do fornecedor: {endereco.fornecedor_id}</ListGroup.Item>
                <ListGroup.Item>Logradouro: {endereco.logradouro}</ListGroup.Item>
                <ListGroup.Item>Complemento: {endereco.complemento}</ListGroup.Item>
                <ListGroup.Item>Cidade: {endereco.cidade}</ListGroup.Item>
                <ListGroup.Item>Estado: {endereco.estado}</ListGroup.Item>
                <ListGroup.Item>CEP: {endereco.cep}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}