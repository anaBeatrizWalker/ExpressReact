import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListGroup } from 'react-bootstrap'

export default function DadosTipoProduto(){

    let {id} = useParams()
    const [tipo_produto, setTipoProduto] = useState({})

    useEffect(()=>{
        api_express.get(`/tipos_produtos/${id}`).then(resp => {
            setTipoProduto(resp.data.tipo_produto)
        })
    }, [id])

    return (
        <div style={{marginTop: '20px'}}>

            <h1>Detalhes do tipo de produto</h1>

            <ListGroup style={{marginTop: '20px'}}>
                <ListGroup.Item>Código: {tipo_produto.id}</ListGroup.Item>
                <ListGroup.Item>Nome: {tipo_produto.nome}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}