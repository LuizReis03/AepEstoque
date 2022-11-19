import React, { useState, useEffect, history, Link } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//Services
import api from '../services/api';

//Static
import "../static/css/lista.css";

function ListaProdutos() {


    const accessToken = localStorage.getItem('accessToken');

    const [products, setProducts] = useState([]);

    let navigate = useNavigate();

    async function editProduct(id) {
        try {
            navigate(`/cadastroProduto/${id}`)
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteProduct(id) {
        var check = window.confirm("Deseja excluir o item selecionado?");

        if (check === false) return

        try {
            await api.delete(`api/v1/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setProducts(products.filter(product => product.id !== id))
        } catch (err) {
            alert('Delete failed! Try again.');
        }
    }

    async function fetchMoreProducts() {
        const response = await api.get('api/v1/items', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }

        });
        console.log(response.data.data)
        setProducts(response.data.data)
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])

    function geraPdf() {

        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const reportTitle = [
            {
                text: 'Estoque',
                fontSize: 15,
                bold: true,
                margin: [15, 20, 0, 45]
            }
        ];

        const dados = products.map((produto) => {
            return [
                { text: produto.nome, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: produto.ativo, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: produto.categoria, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: produto.fornecedor, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: produto.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: produto.quantidade, fontSize: 9, margin: [0, 2, 0, 2] }
            ]
        });

        const details = [
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
                            { text: 'Ativo', style: 'tableHeader', fontSize: 10 },
                            { text: 'Categoria', style: 'tableHeader', fontSize: 10 },
                            { text: 'Fornecedor', style: 'tableHeader', fontSize: 10 },
                            { text: 'Descrição', style: 'tableHeader', fontSize: 10 },
                            { text: 'Quantidade', style: 'tableHeader', fontSize: 10 }
                        ],
                        ...dados
                    ]
                },
                layout: 'lightHorizontalLines'
            }
        ];



        const docDefinitons = {
            pageSize: 'A4',
            pageMargins: [15, 50, 15, 40],
            header: [reportTitle],
            content: [details],
            footer: rodape
        }

        pdfMake.createPdf(docDefinitons).download();



    }

    function rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                aligment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    };
    


    return (
        <div className="book-container">
            <Header />

            <h1 className='titulo-lista'>Produtos</h1>
            <div className='div-relatorio'>
                <h3 className='titulo-relatorio'>Relatório</h3>
                <button id="pdf" type="button" onClick={geraPdf}/>
            </div>
            <ul className='box-lista'>
                {products.map(product => (
                    <li className='lista' key={product.id}>

                        <strong className='titulo-campo-lista'>ID:</strong>
                        <p className='valor-campo-lista'>{product.id}</p>
                        <strong className='titulo-campo-lista'>NOME:</strong>
                        <p className='valor-campo-lista'>{product.nome}</p>
                        <strong className='titulo-campo-lista'>DESCRIÇÂO:</strong>
                        <p className='descricao-campo-lista'>{product.descricao}</p>
                        <strong className='titulo-campo-lista'>QUANTIDADE:</strong>
                        <p className='valor-campo-lista'>{product.quantidade}</p>
                    
                        <input className='btn-lista-edit' onClick={() => editProduct(product.id)}
                            type="submit" value="" />


                        <input className='btn-lista-delete' onClick={() => deleteProduct(product.id)}
                            type="button" value="" />

                    </li>
                ))}
            </ul>
            
        </div>
    );

}

export default ListaProdutos;