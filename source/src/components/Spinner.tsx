/** Spinner.tsx
 *  https://github.com/dmitrymorozoff/react-spinners-kit/tree/master/src/components/whisper
 */

import styled, { keyframes } from "styled-components"

const motion = keyframes`
	0% {
        transform: scale(1, 1);
        opacity: 1;
    }
    100% {
        transform: scale(0, 0);
        opacity: 0;
    }
`

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

interface BallInterface {
	color: string
	size: number
	key: string
	index: number
}

const Ball = styled.div<BallInterface>`
	float: left;
	clear: right;
	margin: ${(props) => props.size / 15}px;
	width: ${(props) => props.size / 5}px;
	height: ${(props) => props.size / 5}px;
	border-radius: 2px;
	background-color: ${(props) => props.color};
	animation-name: ${motion};
	animation-direction: alternate;
	animation-duration: 800ms;
	animation-iteration-count: infinite;
	&:nth-child(1) {
		animation-delay: 200ms;
	}
	&:nth-child(2) {
		animation-delay: 400ms;
	}
	&:nth-child(3) {
		animation-delay: 600ms;
	}
	&:nth-child(4) {
		animation-delay: 400ms;
	}
	&:nth-child(5) {
		animation-delay: 600ms;
	}
	&:nth-child(6) {
		animation-delay: 800ms;
	}
	&:nth-child(7) {
		animation-delay: 600ms;
	}
	&:nth-child(8) {
		animation-delay: 800ms;
	}
	&:nth-child(9) {
		animation-delay: 1000ms;
	}
`

interface WrapperInterface {
	size: number
}

const Wrapper = styled.div<WrapperInterface>`
	margin: 5rem auto 0 auto;
	width: 200px;
	height: 200px;
	animation: ${spin} 10s infinite;
`

function Spinner({ size, color }) {
	const balls: unknown[] = []
	let keyValue = 0
	const countBallsInLine = 3
	for (let i = 0; i < countBallsInLine; i++) {
		for (let j = 0; j < countBallsInLine; j++) {
			balls.push(
				<Ball
					color={color}
					size={size}
					key={keyValue.toString()}
					index={keyValue}
				/>
			)
			keyValue++
		}
	}

	return <Wrapper size={size}>{balls}</Wrapper>
}

export default Spinner
