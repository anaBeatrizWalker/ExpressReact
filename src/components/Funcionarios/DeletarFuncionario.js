import api_express from '../../config/api_express'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DeletarFuncionario(){

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        api_express.delete(`/funcionarios/${id}`).then(resp => {
            alert(`Funcionário ${id} deletado com sucesso.`)
            navigate('/funcionarios')
        })
    }, [])

    return ( 
        <>
        </> 
    )
}