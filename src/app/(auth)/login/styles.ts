"use client"

import styled from "styled-components";

export const LoginContainer = styled.main`
    display: flex;
    margin: 40px auto; 
    width: 900px;
    max-width: 95%;
    height: 600px;
    background-color: #212121; 
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    overflow: hidden; 

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
`
