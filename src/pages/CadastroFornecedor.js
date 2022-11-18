//Libs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroFornecedor() {

    const [nome, setNome] = useState('');
    const [empresa, setEmp] = useState('');
    const [telefone, setTel] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');

    let navigate = useNavigate();

    async function cadProduto(e) {
        e.preventDefault();

        const data = {
            nome,
            empresa,
            telefone,
            cnpj,
            endereco,
            email
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
                <h2 className="titulo-form">CADASTRO FORNECEDOR</h2>

                <label className='titulo-campo-form'>Nome</label>
                <input name="nome" type="text" className='campo-form'
                    onChange={e => setNome(e.target.value)} />

                <label className='titulo-campo-form'>Empresa</label>
                <input name="empresa" type="option" className='campo-form'
                    onChange={e => setEmp(e.target.value)} />

                <label className='titulo-campo-form'>Telefone</label>
                <input name="telefone" type="text" className='campo-form'
                    onChange={e => setTel(e.target.value)} />

                <label className='titulo-campo-form'>CNPJ</label>
                <input name="cnpj" type="text" className='campo-form'
                    onChange={e => setCnpj(e.target.value)} />

                <label className='titulo-campo-form'>Endereço</label>
                <input name="endereco" type="text" className='campo-form'
                    onChange={e => setEndereco(e.target.value)} />

                <label className='titulo-campo-form'>E-mail</label>
                <input name="email" type="email" className='campo-form'
                    onChange={e => setEmail(e.target.value)} />

                <button className="btn-form" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CadastroFornecedor;