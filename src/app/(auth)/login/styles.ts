"use client"

import { Colors } from "@/styles/colors";
import styled from "styled-components";

export const LoginContainer = styled.main`
    display: flex;
    /* Centraliza o container na tela */

    margin: 40px auto; 
    width: 900px;
    max-width: 95%;
    height: 600px; /* Altura fixa para o layout de duas colunas */
    background-color: #212121; /* Um fundo escuro para contrastar */
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    overflow: hidden; /* Garante que o border-radius funcione */

    /* Estilo para a coluna da Imagem (<figure>) */
    & > figure {
        flex: 1; /* Ocupa metade do espaço por padrão */
        display: none; /* Esconde por padrão no mobile */
        
        /* A imagem do Next/Image deve ser o primeiro filho */
        & > img { 
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    /* Estilo para a coluna do Formulário (<section>) */
    & > section {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 45px 30px;
        flex-direction: column;
        text-align: center; /* Centraliza textos */
        
        /* Título */
        & > h1 {
            font-size: 1.8rem;
            color: ${Colors.Textos};
            margin-bottom: 8px;
        }

        /* Descrição (p.descricao, ou o <p> direto) */
        & > p {
            font-size: 0.95rem;
            color: ${Colors.buscar};
            margin-bottom: 25px;
            padding: 0; /* Removendo padding desnecessário */
        }

        /* O formulário (LoginForm) que está dentro da Section */
        & > form {
            width: 100%;
            max-width: 350px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        /* Estilo para os Inputs (assumindo que o componente Input do shadcn usa a tag <input> final) */
        input {
            padding: 12px;
            border: 1px solid #444; 
            border-radius: 8px;
            outline: none;
            background-color:transparent;
            color: #fff;
            font-size: 1rem;
            transition: border-color 0.2s;

            &:focus {
                border-color: ${Colors.CorCabecalho};
            }
        }

        input::placeholder {
            color: #b0bec5;
        }
    }
`
