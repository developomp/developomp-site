import { Link } from "react-router-dom"
import styled from "styled-components"
import ReadProgress from "./ReadProgress"

import Nav from "./Nav"

import Sidebar from "../Sidebar"

import Buttons from "./Buttons"

const Header = styled.header`
    /* set z index to arbitrarily high value to prevent other components from drawing over it */
    z-index: 9999;

    position: fixed;
    width: 100%;

    background-color: ${({ theme }) =>
        theme.theme.component.ui.color.background.default};
    color: ${({ theme }) => theme.theme.color.text.default};
    box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
`

const Container = styled.div`
    margin: 0 auto;
    align-items: center;
    display: flex;
    height: 4rem;

    /* account for 20px scrollbar width */
    @media only screen and (min-width: calc(${({ theme }) =>
            theme.theme.maxDisplayWidth.desktop} + 20px)) {
        width: calc(
            ${({ theme }) => theme.theme.maxDisplayWidth.desktop} - 20px
        );
    }
`

const Icon = styled.img`
    height: 2.5rem;

    display: block;
    margin: 1rem;
`

export default () => {
    return (
        <Header>
            <Container>
                <Link to="/" aria-label="homepage">
                    <Icon src="/icon/icon_circle.svg" alt="logo" />
                </Link>
                <Nav />
                <Buttons />
                <Sidebar />
            </Container>
            <ReadProgress />
        </Header>
    )
}
