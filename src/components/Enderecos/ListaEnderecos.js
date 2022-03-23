import api_express from '../../config/api_express'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Button } from 'react-bootstrap'
import '../estilos.css' 

export default function ListaEnderecos(){

    const [enderecos, setEnderecos] = useState([])

    useEffect(()=>{
        api_express.get('/enderecos').then(resp => {
            setEnderecos(resp.data.enderecos)
        })
    }, [])

    return (
        <div className='detalhes'>

            <h1>Lista dos endereços dos fornecedores</h1>

            <Link className='btn btn-primary' to="/enderecos/novo">Adicionar um endereço</Link>

            {enderecos.map(endereco => { 
                return (
                    <ListGroup className='grupo-lista'>
                        <ListGroup.Item key={endereco.id}>
                            <Link to={`/enderecos/${endereco.id}`}>{endereco.logradouro}</Link>
                            <div className="d-flex justify-content-end">
                                <Button href={`/enderecos/${endereco.id}/editar`} variant="warning" className="p-2 bd-highlight">Editar</Button>
                                <Button href={`/enderecos/${endereco.id}/deletar`} variant="danger" className="p-2 bd-highlight">Deletar</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                )
            })}         
        </div>
    )
}