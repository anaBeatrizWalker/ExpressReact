import React, { useEffect } from 'react'
import api_express from '../config/api_express'

export default function Fornecedores(){

    useEffect(()=>{
        api_express.get('/fornecedores').then(resp => {
            console.log(resp.data.data)
        })
    })

    return (
        <div>
            <h1>Fornecedores</h1>
        </div>
    )
}