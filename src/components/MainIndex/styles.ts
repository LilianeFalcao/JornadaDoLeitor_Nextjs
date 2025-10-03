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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
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
`;
