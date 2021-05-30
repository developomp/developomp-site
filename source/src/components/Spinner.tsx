/**
 *  inspired by https://github.com/dmitrymorozoff/react-spinners-kit/tree/master/src/components/whisper
 */

import React from "react"
import styled, { keyframes } from "styled-components"

interface BallInterface {
	size: number
	key: string
	index: number
}

interface SpinnerProps {
	size: number
}

export default class Spinner extends React.Component<SpinnerProps> {
	balls: unknown[] = []

	motion = keyframes`
		from {
			transform: scale(1, 1);
			opacity: 1;
		}
		to {
			transform: scale(0, 0);
			opacity: 0;
		}
	`

	spin = keyframes`
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	`

	Ball = styled.div<BallInterface>`
		float: left;
		clear: right;
		margin: ${(props) => props.size / 15}px;
		width: ${(props) => props.size / 5}px;
		height: ${(props) => props.size / 5}px;
		border-radius: 2px;
		background-color: lightgrey;
		animation-name: ${this.motion};
		animation-direction: alternate;
		animation-duration: 800ms;
		animation-timing-function: linear;
		animation-iteration-count: infinite;

		/* use a for loop here? */
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

	Wrapper = styled.div`
		margin: 5rem auto 0 auto;
		width: 200px;
		height: 200px;
		animation-timing-function: linear;
		animation: ${this.spin} 10s infinite;
	`

	constructor(props) {
		super(props)

		let keyValue = 0
		const countBallsInLine = 3

		for (let i = 0; i < countBallsInLine; i++) {
			for (let j = 0; j < countBallsInLine; j++) {
				this.balls.push(
					<this.Ball
						size={this.props.size}
						key={keyValue.toString()}
						index={keyValue}
					/>
				)
				keyValue++
			}
		}
	}

	render() {
		return <this.Wrapper>{this.balls}</this.Wrapper>
	}
}
