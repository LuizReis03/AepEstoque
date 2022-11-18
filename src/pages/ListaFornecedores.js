import React, { useState, useEffect, history, Link } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

//Services
import api from '../services/api';

//Static
import "../static/css/lista.css";

function ListaFornecedores() {


    const accessToken = localStorage.getItem('accessToken');

    const [fornecedores, setFornecedores] = useState([]);

    let navigate = useNavigate();

    async function editProvider(id) {
        try {
            navigate(`/cadastroFornecedor/${id}`)
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteProvider(id) {
        var check = window.confirm("Deseja excluir o item selecionado?");

        if (check === false) return

        try {
            await api.delete(`api/v1/providers/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id))
        } catch (err) {
            alert('Delete failed! Try again.');
        }
    }

    async function fetchMoreProviders() {
        const response = await api.get('api/v1/providers', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }

        });

        console.log([response.data])
        setFornecedores(response.data)
    }

    useEffect(() => {
        fetchMoreProviders();
    }, [])

    return (
        <div className="book-container">
            <Header/>

            <h1 className='titulo-lista'>Fornecedores</h1>
            <div className="book-container">
                <ul className='box-lista'>
                    {fornecedores.map(provider => 
                        <li class="info-caixa-doacao" key = {provider.id}>
                            
                        <strong className='titulo-campo-lista'>ID:</strong>
                        <p className='valor-campo-lista'>{provider.id}</p>
                        <strong className='titulo-campo-lista'>NOME:</strong>
                        <p className='valor-campo-lista'>{provider.nome}</p>
                        <strong className='titulo-campo-lista'>Empresa:</strong>
                        <p className='descricao-campo-lista'>{provider.empresa}</p>
                        <strong className='titulo-campo-lista'>Contato:</strong>
                        <p className='valor-campo-lista'>{provider.contato}</p>
                        <strong className='titulo-campo-lista'>Email:</strong>
                        <p className='valor-campo-lista'>{provider.email}</p>

                        <input className='btn-lista-edit' onClick={() => editProvider(provider.id)}
                         type="submit" value=""/>
                          
                    
                        <input className='btn-lista-delete' onClick={() => deleteProvider(provider.id)}
                         type="button" value=""/>

                        </li>
                    )}
                </ul>
            </div>
        </div>
    );




}

export default ListaFornecedores;