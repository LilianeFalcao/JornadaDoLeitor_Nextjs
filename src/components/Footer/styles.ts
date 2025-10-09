"use client"

import { Colors } from "@/styles/colors"
import styled from "styled-components"

export const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:${Colors.CorCabecalho};
    height: 4.2rem;

    h2 {
        margin: 5px;
        color: ${Colors.Textos}
    }
`