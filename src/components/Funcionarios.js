import React, { useEffect } from 'react'
import api_express from '../config/api_express'

export default function Funcionarios(){

    useEffect(()=>{
        api_express.get('/funcionarios').then(resp => {
            console.log(resp.data.data)
        })
    })

    return (
        <div>
            <h1>Funcionários</h1>
        </div>
    )
}