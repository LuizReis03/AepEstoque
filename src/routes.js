import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./pages/Index";
import Home from "./pages/Home";
import CadastroCategoria from './pages/CadastroCategoria';
import CadastroProduto from './pages/CadastroProduto';
import CadastroFornecedor from './pages/CadastroFornecedor';
import CadastroFuncionario from './pages/CadastroFuncionario';
import ListaProdutos from './pages/ListaProdutos';
import ListaFornecedores from './pages/ListaFornecedores';
import ListaCategorias from './pages/ListaCategorias';

export default function App() {
    return (
        <Router>
            <Routes>
                 
                <Route exact path="/" element={ <Login /> }/>

                <Route exact path="/home" element={ <Home /> } />

                <Route exact path="/cadastroCategoria/:categoryId" element={ <CadastroCategoria /> } />

                <Route exact path="/cadastroProduto/:productId" element={ <CadastroProduto /> } />

                <Route exact path="/cadastroFornecedor/:providerId" element={ <CadastroFornecedor /> } />

                <Route exact path="/cadastroFuncionario/:funcionarioId" element={ <CadastroFuncionario /> } />

                <Route exact path="/listaProdutos" element={ <ListaProdutos /> } />

                <Route exact path="/listaFornecedores" element={ <ListaFornecedores /> } />

                <Route exact path="/listaCategorias" element={ <ListaCategorias /> } />


            </Routes>
        </Router>
    );
}