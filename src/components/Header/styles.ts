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

  /* Esconde o checkbox que controla o menu */
  input[type="checkbox"] {
    display: none;
  }

  /* CORREÇÃO:
     Aplicamos display: flex ao 'nav' para alinhar a label do ícone 
     e o div dos links, facilitando a ocultação em desktop.
  */
  nav {
    display: flex;
    align-items: center;
  }

  nav label[for="menu-toggle"] {
    display: none;
  }

  /* Layout padrão do menu (Desktop) */
  nav ul,
  nav div[nav-menu] { /* Seletor mais específico para o container dos links */
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

  @media (max-width: 648px) {

    nav label[for="menu-toggle"] {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 30px;
      height: 25px;
      cursor: pointer;
      z-index: 200;

      & ~ div[nav-menu] {
        display: none; 
      }

      span {
        display: block;
        height: 3px;
        background-color: white;
        border-radius: 3px;
        transition: 0.3s;
      }
    }

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
      transform: translateY(-120%);
      opacity: 0;
      transition: transform 0.4s ease, opacity 0.4s ease;

      & > ul[nav-menu] {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }

      & > * {
        padding: 10px 0;
        width: 100%;
      }
    }

    input[type="checkbox"]:checked ~ nav div[nav-menu] {
      transform: translateY(0);
      opacity: 1;
    }


    input[type="checkbox"]:checked ~ nav label span:nth-child(2) {
      opacity: 0;
    }

    input[type="checkbox"]:checked ~ nav label span:nth-child(1) {
      transform: translateY(11px) rotate(45deg);
    }

    input[type="checkbox"]:checked ~ nav label span:nth-child(3) {
      transform: translateY(-11px) rotate(-45deg);
    }
  }
`;
