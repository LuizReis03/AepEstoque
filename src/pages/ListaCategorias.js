import React, { useState, useEffect, history, Link } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

//Services
import api from '../services/api';

//Static
import "../static/css/lista.css";

function ListaCategorias() {


    const accessToken = localStorage.getItem('accessToken');

    const [categorias, setCategorias] = useState([]);

    let navigate = useNavigate();

    async function editCategory(id) {
        try {
            navigate(`/cadastroCategoria/${id}`)
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteCategory(id) {
        var check = window.confirm("Deseja excluir o item selecionado?");

        if (check === false) return

        try {
            await api.delete(`api/v1/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setCategorias(categorias.filter(categoria => categoria.id !== id))
        } catch (err) {
            alert('Delete failed! Try again.');
        }
    }

    async function fetchMoreCategories() {
        const response = await api.get('api/v1/category', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }

        });

        console.log([response.data])
        setCategorias(response.data)
    }

    useEffect(() => {
        fetchMoreCategories();
    }, [])

    return (
        <div className="book-container">
            <Header/>

            <h1 className='titulo-lista'>Fornecedores</h1>
                <ul className='box-lista'>
                    {categorias.map(categoria => 
                        <li className='lista' key = {categoria.id}>
                            
                        <strong className='titulo-campo-lista'>ID:</strong>
                        <p className='valor-campo-lista'>{categoria.id}</p>
                        <strong className='titulo-campo-lista'>NOME:</strong>
                        <p className='valor-campo-lista'>{categoria.categoryName}</p>

                        <input className='btn-lista-edit' onClick={() => editCategory(categoria.id)}
                         type="submit" value=""/>
                          
                    
                        <input className='btn-lista-delete' onClick={() => deleteCategory(categoria.id)}
                         type="button" value=""/>

                        </li>
                    )}
                </ul>
        </div>
    );




}

export default ListaCategorias;