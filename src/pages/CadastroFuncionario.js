//Libs
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroFuncionario() {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    let navigate = useNavigate();


    const accessToken = localStorage.getItem('accessToken');


    const { categoryId } = useParams();

    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
           nome,
           sobrenome,
           cpf,
           senha,
           email
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
            <form action="" method="post" className="box-form">
                <h2 className="titulo-form">CADASTRO FUNCIONARIO</h2>

                <label className='titulo-campo-form'>Nome</label>
                <input name="nome" type="text" className='campo-form'
                    onChange={e => setNome(e.target.value)} />

                <label className='titulo-campo-form'>Sobrenome</label>
                <input name="sobrenome" type="option" className='campo-form'
                    onChange={e => setSobrenome(e.target.value)} />

                <label className='titulo-campo-form'>Email</label>
                <input name="email" type="email" className='campo-form'
                    onChange={e => setEmail(e.target.value)} />

                <label className='titulo-campo-form'>CPF</label>
                <input name="cpf" type="text" className='campo-form'
                    onChange={e => setCpf(e.target.value)} />

                <label className='titulo-campo-form'>Senha</label>
                <input name="senha" type="password" className='campo-form'
                    onChange={e => setSenha(e.target.value)} />

                <button className="btn-form" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CadastroFuncionario;