//Libs
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

//Services
import api from '../services/api';

function CadastroFornecedor() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [contato, setContato] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    const { providerId } = useParams();

    let navigate = useNavigate();

    async function loadProvider() {
        try {
            const response = await api.get(`api/v1/providers/${providerId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            console.log(response)

            setId(response.data.data.id);
            setEmail(response.data.data.email);
            setCnpj(response.data.data.cnpj);
            setContato(response.data.data.contato);
            setEndereco(response.data.data.endereco);
            setNome(response.data.data.nome)
            setEmpresa(response.data.data.empresa)

        } catch (error) {
            alert('Error recovering Book! Try again!');
            navigate("./home", { replace: true });
        }
    }

    useEffect(() => {
        if (providerId === '0') return;
        else loadProvider();
    }, [providerId])

    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
            nome,
            empresa,
            contato,
            cnpj,
            endereco,
            email
        };

        try {
            if (providerId === '0') {
                await api.post('api/v1/providers', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            } else {
                data.id = id;
                await api.put('api/v1/providers', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }


            
            navigate("./listaFornecedores", { replace: true });
        } catch (err) {
            console.log(err)
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={saveOrUpdate} className="box-form">
                <h2 className="titulo-form">{providerId === '0' ? "CADASTRO FORNECEDOR" : "ATUALIZA FORNECEDOR"}</h2>

                <label className='titulo-campo-form'>Nome</label>
                <input name="nome" type="text" className='campo-form'
                value={nome}
                    onChange={e => setNome(e.target.value)} />

                <label className='titulo-campo-form'>Empresa</label>
                <input name="empresa" type="option" className='campo-form'
                value={empresa}
                    onChange={e => setEmpresa(e.target.value)} />

                <label className='titulo-campo-form'>Telefone</label>
                <input name="telefone" type="text" className='campo-form'
                value={contato}
                    onChange={e => setContato(e.target.value)} />

                <label className='titulo-campo-form'>CNPJ</label>
                <input name="cnpj" type="text" className='campo-form'
                value={cnpj}
                    onChange={e => setCnpj(e.target.value)} />

                <label className='titulo-campo-form'>Endereço</label>
                <input name="endereco" type="text" className='campo-form'
                value={endereco}
                    onChange={e => setEndereco(e.target.value)} />

                <label className='titulo-campo-form'>E-mail</label>
                <input name="email" type="email" className='campo-form'
                value={email}
                    onChange={e => setEmail(e.target.value)} />

                <button className="btn-form" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CadastroFornecedor;