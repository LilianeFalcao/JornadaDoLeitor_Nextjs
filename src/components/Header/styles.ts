"use client"

import { Colors } from "@/styles/colors"
import styled from "styled-components"

export const HeaderContainer = styled.header`
    background-color: ${Colors.CorCabecalho};
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 5rem;

    img {
        height: 50px;
    }

    nav ul {
        list-style: none;
        display: flex;
        gap: 20px;
    }

    nav a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        &:hover {
        color: ${Colors.EfeitoBotao};
        }
    }

    nav button,
    nav .btn {
        background-color: ${Colors.Botao};
        color: #ffffff;
        padding: 8px 14px;
        border-radius: 6px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
        background-color: ${Colors.EfeitoBotao};
        color: white;
        }
    }

`