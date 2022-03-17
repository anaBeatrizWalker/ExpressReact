import React, { useEffect } from 'react'
import api_express from '../config/api_express'

export default function Enderecos(){

    useEffect(()=>{
        api_express.get('/enderecos').then(resp => {
            console.log(resp.data.data)
        })
    })

    return (
        <div>
            <h1>Endereços</h1>
        </div>
    )
}