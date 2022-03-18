import React, { useEffect, useState } from 'react'
import api_express from '../../config/api_express'
import { useParams } from 'react-router'

import { ListGroup } from 'react-bootstrap'

export default function DadosProduto(){

    let {id} = useParams()
    const [produto, setProduto] = useState({})

    useEffect(()=>{
        api_express.get(`/produtos/${id}`).then(resp => {
            setProduto(resp.data.produto)
        })
    }, [id])

    return (
        <div style={{marginTop: '20px'}}>

            <h1>Detalhes do produto</h1>

            <ListGroup style={{marginTop: '20px'}}>
                <ListGroup.Item>Código: {produto.id}</ListGroup.Item>
                <ListGroup.Item>Nome: {produto.nome}</ListGroup.Item>
                <ListGroup.Item>Preço: {produto.preco}</ListGroup.Item>
                <ListGroup.Item>Quantidade: {produto.quantidade}</ListGroup.Item>
                <ListGroup.Item>Validade: {produto.validade}</ListGroup.Item>
                <ListGroup.Item>Categoria: {produto.tipo_produto_id}</ListGroup.Item>
                <ListGroup.Item>Fornecedor: {produto.fornecedor_id}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}