import React from "react"
import { Nav } from 'react-bootstrap'

//Nav
export default function Navegation(){
    return (
        <div style={{ marginTop: '20px' }}>
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