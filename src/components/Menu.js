import React from "react"
import { Nav } from 'react-bootstrap'
import './estilos.css'

export default function Menu(){
    return (
        <div className="margin-top">
            <Nav className="justify-content-center" activeKey="/">
                <Nav.Item>
                    <Nav.Link href="/">Produtos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/tipos_produtos">Tipos de Produtos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/fornecedores">Fornecedores</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/enderecos">Endereços dos Fornecedores</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/funcionarios">Funcionários</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}