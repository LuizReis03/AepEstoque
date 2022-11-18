//Libs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroCategoria() {

    const [nomeCategoria, setCategoria] = useState('');
    let navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            nomeCategoria
        };

        try {
            const response = await api.post('login', data);

            localStorage.setItem('accessToken', response.data);


            navigate("./cadastraCategoria", { replace: true });
        } catch (err) {
            console.log(err)
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <div>
            <Header />
            <form action="" method="post" className="box-form">
                <h2 className="titulo-form">CADASTRO CATEGORIA</h2>

                <label className='titulo-campo-form'>Nome categoria</label>
                <input name="nomeCategoria" type="text" className='campo-form' 
                onChange={e => setCategoria(e.target.value)}/>

                <button className="btn-form" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CadastroCategoria;