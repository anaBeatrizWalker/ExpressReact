import api_express from '../../config/api_express'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DeletarTipoProduto(){

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        api_express.delete(`/tipos_produtos/${id}`).then(resp => {
            alert(`Tipo de produto ${id} deletado com sucesso.`)
            navigate('/tipos_produtos')
        })
    }, [])

    return ( 
        <>
        </> 
    )
}