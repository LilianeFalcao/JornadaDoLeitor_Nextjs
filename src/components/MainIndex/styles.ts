"use client"

import { Colors } from "@/styles/colors";
import styled from "styled-components";

// Container principal do main
export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;
  min-height: calc(100vh - 9rem);

  h1 {
    font-size: 1.8rem;
    max-width: 700px;
    margin: 0 auto;
    color: ${Colors.Titulo};
  }
`;

// Container de cards
export const CardsContainer = styled.section`
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.Cards};
  border-radius: 15px;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 15px;
`;

// Card individual
export const Card = styled.section`
  background-color: ${Colors.Cards};
  display: flex;
  flex-direction: row;
  gap: 20px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex: 1 1 280px;
  max-width: 100%;
`;

// Imagem do card
export const CardImage = styled.div`
  width: 160px;
  aspect-ratio: 160 / 240; /* controla a altura automaticamente */
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative; /* necessário para o Image fill */
`;

// Área de texto dentro do card
export const CardText = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  justify-content: center;
  align-items: flex-start;

  h4 {
    font-size: 1.3rem;
    font-weight: bold;
  }

  p,
  label {
    color: white;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
`;

// Progress bar estilizada
export const Progress = styled.progress`
  width: 100%;
  height: 15px;
  border-radius: 8px;
  overflow: hidden;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #dcdcdc;
    border-radius: 8px;
  }
  &::-webkit-progress-value {
    background-color: #455a64;
    border-radius: 8px;
  }
  &::-moz-progress-bar {
    background-color: #455a64;
    border-radius: 8px;
  }
`;

// Área de botões
export const Actions = styled.nav`
  display: flex;
  gap: 15px;

  button {
    background: ${Colors.Botao};
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${Colors.EfeitoBotao};
    }
  }

`
// Área dos filtros
  export const FiltrosContainder = styled.aside`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;

  `

  export const Search = styled.form`
    flex: 1;
    display: flex;

    input[type="search"] {
      background-color: ${Colors.buscar};
      border-radius: 15px;
      padding: 12px 20px;
      width: 100%;
      max-width: 600px;
      border: none;
      outline: none;
    }
  
  `

  export const Filtros = styled.aside`
    display: flex;
    gap: 20px;
  
    button {
      background-color: ${Colors.Botao};
      color: ${Colors.Textos  };
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    
    &:hover { background-color: ${Colors.EfeitoBotao} }  
    
    }
  `   
;

