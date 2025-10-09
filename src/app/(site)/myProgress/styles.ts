'use client'
import {Colors} from "../../../styles/colors"
import styled from "styled-components"

export const CardActions = styled.nav`
   display: flex;
  gap: 12px;

  button,
  a {
    background: ${Colors.Botao}; /* usa a paleta de cores, se disponível */
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;

    &:hover {
      background: ${Colors.EfeitoBotao};
    }

    img {
      max-width: 70%;
      max-height: 70%;
      object-fit: contain;
      filter: invert(100%);
    }
  }
`;