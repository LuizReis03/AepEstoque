import React from "react";
import { Link } from "react-router-dom";

//Img
import ImgRetangulo from '../static/img/retanguloHeader.png';

//CSS
import "../static/css/header.css";

function Header() {
    return (
        <div>
            <header>
                <img class="logo" src={ImgRetangulo} />
                <div className="div-link-header">
                    <Link to="/home">
                        <h3 class="link-header">Cadastros</h3>
                    </Link>

                    <Link to="/listaProdutos">
                        <h3 class="link-header">Produtos</h3>
                    </Link>

                    <Link to="/listaFornecedores">
                        <h3 class="link-header">Fornecedores</h3>
                    </Link>

                    <Link to="/listaCategorias">
                        <h3 class="link-header">Categorias</h3>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Header;