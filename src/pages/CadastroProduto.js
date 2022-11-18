//Libs
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroProduto() {

    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fornecedor, setFornecedor] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    const { productId } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        if (productId === '0') return;
        else loadProduct();
    }, [productId])

    async function loadCategoria() {
        try {
            const response = await api.get(`api/v1/category/allCategoryNames`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setCategories(response.data.data);

        } catch (error) {
            alert('Error recovering category name! Try again!');
            navigate("./home", { replace: true });
        }
    }

    useEffect(() => {
        loadCategoria();
    }, [])




    async function loadFornecedores() {
        try {
            const response = await api.get(`api/v1/providers/allProviderNames`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setProviders(response.data.data);

        } catch (error) {
            alert('Error recovering category name! Try again!');
            navigate("./home", { replace: true });
        }
    }

    useEffect(() => {
        loadFornecedores();
    }, [])




    async function loadProduct() {
        try {
            const response = await api.get(`api/v1/items/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            console.log(response)

            setId(response.data.data.id);
            setQuantidade(response.data.data.quantidade);
            setDescricao(response.data.data.descricao);
            setNome(response.data.data.nome);
            setCategoria(response.data.data.categoria);
            setFornecedor(response.data.data.fornecedor)

        } catch (error) {
            alert('Error recovering Book! Try again!');
            navigate("./home", { replace: true });
        }
    }


    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
            nome,
            quantidade,
            descricao,
            categoria,
            fornecedor
        };

        try {
            if (productId === '0') {
                await api.post('api/v1/items', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            } else {
                data.id = id;
                await api.put('api/v1/items', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }

        } catch (err) {
            console.log(err)
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={saveOrUpdate} className="box-form">
                <h2 className="titulo-form">CADASTRO PRODUTO</h2>

                <label className='titulo-campo-form'>Nome produto</label>
                <input name="nomeProduto" type="text" className='campo-form'
                    value={nome}
                    onChange={e => setNome(e.target.value)} />


                <label className='titulo-campo-form'>Nome Categoria</label>
                <select className='select-form' name="idCategoria" id="idCategoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option className='option-form' value="0">Selecione uma opção</option>
                    {categories.map(categoria => (<option key={categoria.id}> {categoria} </option>))}
                </select>

                <label className='titulo-campo-form'>Nome Fornecedor</label>
                <select className='select-form' name="idFornecedor" id="idFornecedor" value={fornecedor} onChange={e => setFornecedor(e.target.value)}>
                    <option className='option-form' value="0">Selecione uma opção</option>
                    {providers.map(fornecedor => (<option key={fornecedor.id}> {fornecedor} </option>))}
                </select>

                <label className='titulo-campo-form'>Descrição</label>
                <input name="descricao" type="option" className='campo-form'
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)} />


                <label className='titulo-campo-form'>Quantidade</label>
                <input name="quantidade" type="text" className='campo-form'
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)} />

                <button className="btn-form" type="submit">Enviar</button>
            </form>
        </div >
    );
}

export default CadastroProduto;