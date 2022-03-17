import React, { useEffect } from 'react'
import api_express from '../config/api_express'

export default function TiposProdutos(){
    
    useEffect(()=>{
        api_express.get('/tipos_produtos').then(resp => {
            console.log(resp.data.data)
        })
    })

    return (
        <div>
            <h1>Tipos de Produtos</h1>
        </div>
    )
}