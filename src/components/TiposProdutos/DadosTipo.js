import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListGroup } from 'react-bootstrap'
import '../estilos.css'

export default function DadosTipoProduto(){

    let {id} = useParams()
    const [tipo_produto, setTipoProduto] = useState({})

    useEffect(()=>{
        api_express.get(`/tipos_produtos/${id}`).then(resp => {
            setTipoProduto(resp.data.tipo_produto)
        })
    }, [id])

    return (
        <div className='detalhes'>

            <h1>Detalhes do tipo de produto</h1>

            <ListGroup className='grupo-lista'>
                <ListGroup.Item>Código: {tipo_produto.id}</ListGroup.Item>
                <ListGroup.Item>Nome: {tipo_produto.nome}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}