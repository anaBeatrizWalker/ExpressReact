import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import api_express from '../../config/api_express'

export default function DeletarProduto(){

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        api_express.delete(`/produtos/${id}`).then(resp => {
            alert(`Produto ${id} deletado com sucesso.`)
            navigate('/produtos')
        })
    }, [])

    return ( 
        <>
        </> 
    )
}