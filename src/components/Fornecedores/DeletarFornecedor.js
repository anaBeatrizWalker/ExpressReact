import api_express from '../../config/api_express'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DeletarFornecedor(){

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        api_express.delete(`/fornecedores/${id}`).then(resp => {
            alert(`Fornecedor ${id} deletado com sucesso.`)
            navigate('/fornecedores')
        })
    }, [])

    return ( 
        <>
        </> 
    )
}