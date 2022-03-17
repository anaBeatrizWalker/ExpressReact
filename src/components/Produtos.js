import React, { useEffect } from 'react'
import api_express from '../config/api_express'

export default function Produtos(){

    useEffect(()=>{
        api_express.get('/produtos').then(resp => {
            console.log(resp.data.data)
        })
    })

    return (
        <div>
            <h1>Produtos</h1>
        </div>
    )
}