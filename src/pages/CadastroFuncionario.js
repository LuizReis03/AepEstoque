//Libs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroFuncionario() {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTel] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    let navigate = useNavigate();

    async function cadProduto(e) {
        e.preventDefault();

        const data = {
            nome,
            sobrenome,
            telefone,
            cpf,
            senha
        };

        try {
            const response = await api.post('cadProduto', data);

            localStorage.setItem('accessToken', response.data);


            navigate("./cadastroProduto", { replace: true });
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

                <label className='titulo-campo-form'>Telefone</label>
                <input name="telefone" type="text" className='campo-form'
                    onChange={e => setTel(e.target.value)} />

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