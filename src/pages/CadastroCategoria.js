//Libs
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroCategoria() {

    const [id, setId] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    let navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    const { categoryId } = useParams();

    async function loadCategory() {
        try {
            const response = await api.get(`api/v1/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            console.log(response.data)

            setId(response.data.data.id);
            setCategoryName(response.data.data.categoryName);

        } catch (error) {
            alert('Error recovering Book! Try again!');
            navigate("./home", { replace: true });
        }
    }

    useEffect(() => {
        if (categoryId === '0') return;
        else loadCategory();
    }, [categoryId])

    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
           categoryName
        };

        try {
            if (categoryId === '0') {
                await api.post('api/v1/category', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            } else {
                data.id = id;
                await api.put('api/v1/category', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }


            
            navigate(`/ListaCategorias`)
        } catch (err) {
            console.log(err)
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={saveOrUpdate} className="box-form">
                <h2 className="titulo-form">{categoryId === '0' ? "CADASTRO CATEGORIA" : "ATUALIZA CATEGORIA"}</h2>

                <label className='titulo-campo-form'>Nome categoria</label>
                <input name="nomeCategoria" type="text" className='campo-form' 
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}/>

                <button className="btn-form" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CadastroCategoria;