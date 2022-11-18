import React, { useState, useEffect, history, Link } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

//Services
import api from '../services/api';

//Static
import "../static/css/lista.css";

function ListaProdutos() {


    const accessToken = localStorage.getItem('accessToken');

    const [fornecedor, setFornecedor] = useState([]);

    let navigate = useNavigate();

    async function editProduct(id) {
        try {
            navigate(`/cadastroFornecedor/${id}`)
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteProduct(id) {
        var check = window.confirm("Deseja excluir o item selecionado?");

        if (check == false) return

        try {
            await api.delete(`api/v1/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setFornecedor(fornecedor.filter(fornecedor => fornecedor.id !== id))
        } catch (err) {
            alert('Delete failed! Try again.');
        }
    }

    async function fetchMoreProducts() {
        const response = await api.get('api/v1/items', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            
        });

        console.log([response.data])
        setFornecedor(response.data.data)
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])

    return (
        <div className="book-container">
            <Header/>

            <h1 className='titulo-lista'>Produtos</h1>
            <ul className='box-lista'>
                {products.map(fornecedor => (
                    <li className='lista' key={fornecedor.id}>

                        <strong className='titulo-campo-lista'>ID:</strong>
                        <p className='valor-campo-lista'>{fornecedor.id}</p>
                        <strong className='titulo-campo-lista'>NOME:</strong>
                        <p className='valor-campo-lista'>{fornecedor.nome}</p>
                        <strong className='titulo-campo-lista'>EMPRESA:</strong>
                        <p className='valor-campo-lista'>{fornecedor.empresa}</p>
                        <strong className='titulo-campo-lista'>TELEFONE:</strong>
                        <p className='valor-campo-lista'>{fornecedor.telefone}</p>
                        <strong className='titulo-campo-lista'>E-MAIL:</strong>
                        <p className='valor-campo-lista'>{fornecedor.email}</p>
                        
                        <input className='btn-lista-edit' onClick={() => editProduct(fornecedor.id)}
                         type="submit" value=""/>
                          
                    
                        <input className='btn-lista-delete' onClick={() => deleteProduct(fornecedor.id)}
                         type="button" value=""/>

                    </li>
                ))}
            </ul>
        </div>
    );

}

export default ListaProdutos;