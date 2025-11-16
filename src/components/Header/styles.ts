"use client";

import { Colors } from "@/styles/colors";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${Colors.CorCabecalho};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 5rem;
  position: relative;

  img {
    height: 50px;
  }

  /* Esconde o checkbox em todas as telas */
  input[type="checkbox"] {
    display: none;
  }

  nav {
    display: flex;
    align-items: center;
  }

  /* Esconde o ícone do hambúrguer em telas maiores */
  nav label[for="menu-toggle"] {
    display: none;
  }
                                
  nav ul,
  .nav-menu ul { /* Seletores para os links na versão desktop */
    list-style: none;
    display: flex;
    gap: 20px;
    align-items: center;
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

  /* * ############################
   * ESTILOS MOBILE (max-width: 648px)
   * ############################
   */
  @media (max-width: 648px) {

    /* Mostra o ícone do hambúrguer e o estiliza */
    nav label[for="menu-toggle"] {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 30px;
      height: 25px;
      cursor: pointer;
      z-index: 200;

      span {
        display: block;
        height: 3px;
        background-color: white;
        border-radius: 3px;
        transition: 0.3s;
      }
    }

    /* Estiliza e esconde o menu por padrão */
    .nav-menu {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      
      position: absolute;
      top: 5rem;
      left: 0;
      width: 100%;
      background-color: ${Colors.CorCabecalho};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 150;
      
      /* Esconde o menu com transform e opacidade */
      transform: translateY(-120%);
      opacity: 0;
      transition: transform 0.4s ease, opacity 0.4s ease;

      /* Estilos para o conteúdo interno do menu */
      & > ul {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }

      & > * {
        padding: 10px 0;
        width: 100%;
      }
    }

    input[type="checkbox"]:checked ~ .nav-menu {
    transform: translateY(0);
    opacity: 1;
    }

    /* 2. Animação da barra do meio do hambúrguer */
    /* Removeu o 'nav' do seletor */
    input[type="checkbox"]:checked ~ label span:nth-child(2) {
      opacity: 0;
    }

    /* 3. Animação da barra superior (rotaciona 45 graus) */
    /* Removeu o 'nav' do seletor */
    input[type="checkbox"]:checked ~ label span:nth-child(1) {
      transform: translateY(11px) rotate(45deg);
    }

    /* 4. Animação da barra inferior (rotaciona -45 graus) */
    /* Removeu o 'nav' do seletor */
    input[type="checkbox"]:checked ~ label span:nth-child(3) {
      transform: translateY(-11px) rotate(-45deg);
    }
  }
`;