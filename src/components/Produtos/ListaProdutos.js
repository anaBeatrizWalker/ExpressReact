import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Button, Col, Row } from 'react-bootstrap'
import api_express from '../../config/api_express'

export default function ListaProdutos(){

    const [produtos, setProdutos] = useState([])

    useEffect(()=>{
        api_express.get('/produtos').then(resp => {
            setProdutos(resp.data.produtos)
        })
    }, [])

    return (
        <div style={{marginTop: '20px'}}>

            <h1>Lista dos produtos</h1>

            <Link className='btn btn-primary' to="/produtos/novo">Adicionar produto</Link>

            {produtos.map(produto => { 
                return (
                    <ListGroup style={{marginTop: '20px', width: '50%'}}>
                        <ListGroup.Item key={produto.id}>
                            <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
                            <div className="d-flex justify-content-end">
                                <Button href={`/produtos/${produto.id}/editar`} variant="warning" className="p-2 bd-highlight">Editar</Button>
                                <Button href={`/produtos/${produto.id}/deletar`} variant="danger" className="p-2 bd-highlight">Deletar</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                )
            })}         
        </div>
    )
}