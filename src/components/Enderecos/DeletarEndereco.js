import api_express from '../../config/api_express'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DeletarEndereco(){

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        api_express.delete(`/enderecos/${id}`).then(resp => {
            alert(`Endereço ${id} deletado com sucesso.`)
            navigate('/enderecos')
        })
    }, [])

    return ( 
        <>
        </> 
    )
}