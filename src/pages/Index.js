//Libs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Static
import "../static/css/index.css";
import ImgRetangulo from '../static/img/retanguloLogin.png';

//Services
import api from '../services/api';

function Login() {

    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    let navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            cpf,
            senha,
        };

        try {
            const response = await api.post('login', data);

            localStorage.setItem('accessToken', response.data);


            navigate("/home", { replace: true });
        } catch (err) {
            console.log(err)
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <div className="fundo-login">
            <form onSubmit={login} className="box-login">
                <img className="retanguloLogin" src={ImgRetangulo} />
                <h2 className="titulo-login">Login</h2>

                <label className='titulo-campo-login'>CPF</label>
                <input name="cpf" type="text" placeholder="000.000.000-00" className='campo-login' 
                onChange={e => setCpf(e.target.value)}/>

                <label className='titulo-campo-login'>Senha</label>
                <input name="senha" type="password" placeholder="********" className='campo-login' 
                onChange={e => setSenha(e.target.value)}/>

                <p className='link-esq-senha'>Esqueci minha senha</p>
                <button className="btn-login" type="submit">ENTRAR</button>
            </form>
        </div>
    );
}

export default Login;