//Libs
import React, { useState } from "react";
import { Link } from "react-router-dom";

//Services
import api from '../services/api'

//Components
import Header from "../components/Header"

//Static
import "../static/css/home.css";
import mais from "../static/img/mais.png"
import exclamacao from "../static/img/exclamacao.png"

function Home() {

    return (
        <div>
            <Header />
                <div className="boxes-cad">
                    <div className="box-cad">
                        <h3 className="titulo-cad">CADASTRO DE CATEGORIA</h3>
                        <Link to="/cadastroCategoria">
                            <img className="img-cad-home" src={mais} />
                        </Link>
                    </div>
                    <div className="box-cad">
                        <h3 className="titulo-cad">CADASTRO DE PRODUTO</h3>
                        <Link to="/cadastroProduto">
                            <img className="img-cad-home" src={mais} />
                        </Link>
                    </div>
                    <div className="box-cad">
                        <h3 className="titulo-cad">CADASTRO DE FORNECEDOR</h3>
                        <Link to="/cadastroFornecedor">
                            <img className="img-cad-home" src={mais} />
                        </Link>
                    </div>
                    <div className="box-cad">
                        <h3 className="titulo-cad">CADASTRO DE FUNCIONÁRIO</h3>
                        <Link to="/cadastroFuncionario">
                            <img className="img-cad-home" src={mais} />
                        </Link>
                    </div>
                </div>
        </div>
    );
}

export default Home;