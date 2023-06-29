import styled from "styled-components"

import GithubLinkIcon from "../GithubLinkIcon"

const StyledFooter = styled.footer`
    display: flex;

    // congratulation. You've found the lucky 7s
    min-height: 7.77rem;
    max-height: 7.77rem;

    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) =>
        theme.theme.component.footer.color.background};
`

const StyledFooterContainer = styled.div`
    display: flex;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;

    text-align: center;
    color: gray;

    width: 100%;
    max-width: ${({ theme }) => theme.theme.maxDisplayWidth.desktop};
`

export default () => {
    return (
        <StyledFooter>
            <StyledFooterContainer>
                <div>
                    Created by <b>developomp</b>
                </div>

                <GithubLinkIcon link="https://github.com/developomp/developomp-site" />
            </StyledFooterContainer>
        </StyledFooter>
    )
}
