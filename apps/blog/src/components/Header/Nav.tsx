import { type FC } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import NavbarData from "../../data/NavbarData"
import HeaderButton from "./HeaderButton"

const StyledNav = styled.div`
    display: flex;
    height: 100%;

    @media only screen and (max-width: ${({ theme }) =>
            theme.theme.maxDisplayWidth.mobile}) {
        display: none;
    }
`

const Nav: FC = () => {
    return (
        <StyledNav>
            {NavbarData.map(({ path, title }, index) => {
                return path.at(0) === "/" ? (
                    <Link key={index} to={path}>
                        <HeaderButton>{title}</HeaderButton>
                    </Link>
                ) : (
                    <a key={index} target="_blank" href={path} rel="noreferrer">
                        <HeaderButton>{title}</HeaderButton>
                    </a>
                )
            })}
        </StyledNav>
    )
}

export default Nav
