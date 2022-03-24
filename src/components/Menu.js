import React from "react"
import { Nav } from 'react-bootstrap'
import './estilos.css'

export default function Menu(){
    return (
        <div className="detalhes">
            <Nav fill variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/produtos">Produtos</Nav.Link>
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