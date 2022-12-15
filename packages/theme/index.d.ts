export interface Theme {
	font: {
		sansSerif: string
		monospace: string
	}

	color: {
		text: {
			highContrast: string
			default: string
			gray: string
		}
		background: string
	}

	maxDisplayWidth: {
		mobile: string
		desktop: string
	}

	component: {
		anchor: {
			color: {
				default: string
				hover: string
				active: string
				header: string
			}
		}

		blockQuote: {
			color: {
				background: string
				borderLeft: string
			}
		}

		card: {
			color: {
				background: string
				hoverGlow: string
			}
		}

		code: {
			inline: {
				color: {
					text: string
					background: string
					border: string
				}
			}
			block: {
				color: {
					border: string
					highlight: string
				}
				style: string
			}
		}

		footer: {
			color: {
				background: string
				text: string
			}
		}

		header: {
			color: {
				background: string
				hover: string
				text: string
			}
			height: string
		}

		input: {
			color: {
				background: {
					default: string
					itemHover: string
				}
				border: {
					default: string
					hover: string
					focus: string
				}
				placeHolder: string
			}
		}

		kbd: {
			color: {
				text: string
				border: string
				outerShadow: string
				innerShadow: string
				background: string
			}
		}

		mark: {
			color: {
				text: string
				background: string
			}
		}

		scrollbar: {
			color: {
				track: string
				thumb: string
			}
			width: string
			borderRadius: string
		}

		scrollProgressBar: {
			color: {
				background: string
				foreground: string
			}
		}

		table: {
			color: {
				border: string
				even: string
			}
		}

		ui: {
			color: {
				background: {
					default: string
					hover: string
				}
				border: string
			}
		}
	}
}
