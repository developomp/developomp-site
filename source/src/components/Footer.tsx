import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import theme from "styled-theming"

const StyledFooter = styled.footer`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1px; /* footer goes outside the page by 1 px for some reason */
	padding: 50px 10px;
	background-color: white;
	background-color: ${theme("mode", {
		light: "white",
		dark: "black",
	})};
	color: ${theme("mode", {
		light: "black",
		dark: "white",
	})};
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.logo {
		color: gray;
	}
`

const StyledLink = styled.a`
	width: 30px;
	font-size: 2rem;
	color: ${theme("mode", {
		light: "lightgrey",
		dark: "grey",
	})};

	&:hover {
		color: ${theme("mode", {
			light: "black",
			dark: "white",
		})};
	}
`

function Footer() {
	return (
		<StyledFooter>
			<div className="logo">
				Copyright &copy; <strong>develo</strong>pomp
			</div>

			<div className="icons">
				<StyledLink
					href="https://github.com/developomp/developomp-site"
					target="_blank"
				>
					<FontAwesomeIcon icon={faGithub} />
				</StyledLink>
			</div>
		</StyledFooter>
	)
}

export default Footer
