import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import api_express from '../../config/api_express'

export default function ListaProdutos(){

    const [produtos, setProdutos] = useState([])

    useEffect(()=>{
        api_express.get('/produtos').then(resp => {
            setProdutos(resp.data.produtos)
            //console.log((resp.data.produtos))
        })
    }, [])

    return (
        <div style={{marginTop: '20px'}}>

            <h1>Lista dos produtos</h1>

            {produtos.map(produto => { 
                return (
                    <ListGroup style={{marginTop: '20px'}}>
                        <ListGroup.Item key={produto.id}>
                            <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
                        </ListGroup.Item>
                    </ListGroup>
                )
            })}         
        </div>
    )
}