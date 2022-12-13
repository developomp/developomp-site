interface Theme extends Object {
	font: {
		sansSerif: string
		monospace: string
	}

	maxDisplayWidth: {
		mobile: string
		desktop: string
	}

	component: {
		scrollbar: {
			width: string
			borderRadius: string
		}

		header: {
			color: {
				background: string
				hover: string
				text: string
			}
			height: string
		}

		scrollProgressBar: {
			color: {
				background: string
				foreground: string
			}
		}

		card: {
			color: {
				background: string
			}
		}

		footer: {
			color: {
				background: string
				text: string
			}
		}

		ui: {
			color: {
				background: {
					interactive: string
				}
				text: {
					on1: string
					link: string
					linkActive: string
				}
			}
		}
	}
}
