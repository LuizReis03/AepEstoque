//Libs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Static
import "../static/css/formulario.css";

//Components
import Header from "../components/Header"

function EditaProduto() {

    return (
        <div>
            <Header />
            <h1>EDITAR PRODUTOS</h1>
        </div>
    );
}

export default EditaProduto;