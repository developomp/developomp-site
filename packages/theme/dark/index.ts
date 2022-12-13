const theme: Theme = {
	font: {
		sansSerif: "'Noto Sans KR', sans-serif", // https://fonts.google.com/noto/specimen/Noto+Sans+KR
		monospace: "'Source Code Pro', monospace",
	},

	maxDisplayWidth: {
		mobile: "1024px", // max-w-screen-lg
		desktop: "1536px", // max-w-screen-2xl
	},

	component: {
		scrollbar: {
			width: "8px", // w-2
			borderRadius: "4px", // rounded
		},

		header: {
			color: {
				background: "#202225", // custom
				hover: "#3f3f46", // zinc-700
				text: "#d4d4d8", // zinc-300
			},
			height: "16px", // h-4
		},

		scrollProgressBar: {
			color: {
				background: "#52525b", // zinc 600
				foreground: "#d4d4d8", // zinc-300
			},
		},

		card: {
			color: {
				background: "#2f3136",
			},
		},

		footer: {
			color: {
				background: "",
				text: "",
			},
		},

		ui: {
			color: {
				background: {
					interactive: "",
				},
				text: {
					on1: "",
					link: "#66AAFF",
					linkActive: "#4592F7",
				},
			},
		},
	},
}

export default theme
