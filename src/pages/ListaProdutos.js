import React, { useState, useEffect, history, Link } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

//Services
import api from '../services/api';

//Static
import "../static/css/lista.css";

function ListaProdutos() {


    const accessToken = localStorage.getItem('accessToken');

    const [products, setProducts] = useState([]);

    let navigate = useNavigate();

    async function editProduct(id) {
        try {
            navigate(`/cadastroProduto/${id}`)
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteProduct(id) {
        var check = window.confirm("Deseja excluir o item selecionado?");

        if (check === false) return

        try {
            await api.delete(`api/v1/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setProducts(products.filter(product => product.id !== id))
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
        setProducts(response.data.data)
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])

    return (
        <div className="book-container">
            <Header/>

            <h1 className='titulo-lista'>Produtos</h1>
            <ul className='box-lista'>
                {products.map(product => (
                    <li className='lista' key={product.id}>

                        <strong className='titulo-campo-lista'>ID:</strong>
                        <p className='valor-campo-lista'>{product.id}</p>
                        <strong className='titulo-campo-lista'>NOME:</strong>
                        <p className='valor-campo-lista'>{product.nome}</p>
                        <strong className='titulo-campo-lista'>DESCIRCAO:</strong>
                        <p className='descricao-campo-lista'>{product.descricao}</p>
                        <strong className='titulo-campo-lista'>QUANTIDADE:</strong>
                        <p className='valor-campo-lista'>{product.quantidade}</p>
                        
                        <input className='btn-lista-edit' onClick={() => editProduct(product.id)}
                         type="submit" value=""/>
                          
                    
                        <input className='btn-lista-delete' onClick={() => deleteProduct(product.id)}
                         type="button" value=""/>

                    </li>
                ))}
            </ul>
        </div>
    );

}

export default ListaProdutos;