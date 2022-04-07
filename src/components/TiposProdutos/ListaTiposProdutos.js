import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Button } from 'react-bootstrap'
import '../estilos.css'

export default function ListaTiposProdutos(){

    const [tipos_produtos, setTiposProdutos] = useState([])
    
    useEffect(()=>{
        api_express.get('/tipos_produtos').then(resp => {
            setTiposProdutos(resp.data.tipos_produto)
        })
    }, [])

    return (
        <div className='detalhes'>

            <h1>Lista dos tipos de produtos</h1>

            <Link className='btn btn-success' to="/tipos_produtos/novo">Adicionar tipo</Link>

            {tipos_produtos.map(tipo_produto => { 
                return (
                    <ListGroup className='margin-top'>
                        <ListGroup.Item key={tipo_produto.id}>
                            <Link to={`/tipos_produtos/${tipo_produto.id}`}>{tipo_produto.nome}</Link>
                            <div className="d-flex justify-content-end">
                                <Button href={`/tipos_produtos/${tipo_produto.id}/editar`} variant="warning" className="p-2 bd-highlight buttons">Editar</Button>
                                <Button href={`/tipos_produtos/${tipo_produto.id}/deletar`} variant="danger" className="p-2 bd-highlight buttons">Deletar</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                )
            })}         
        </div>
    )
}