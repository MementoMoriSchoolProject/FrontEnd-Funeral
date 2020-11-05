export const theme = {
	breakpoints: ["40em", "52em", "64em"],
	fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
	colors: {
		blue: "#07c",
		primary: '#A0BDE3',
		secondary: '#B6B6B6',
		highlight: "#DfDfDf",
		background: '#F5F6F8',
        text: '#1E151B',
	},
	space: [0, 4, 8, 16, 32, 64, 128, 256],
	fonts: {
		body: "Poppins, sans-serif",
		heading: "inherit",
		monospace: "Poppins",
	},
	fontWeights: {
		body: 400,
		heading: 700,
		bold: 700,
	},
	lineHeights: {
		body: 1.5,
		heading: 1.25,
	},
	shadows: {
		small: "0 0 4px rgba(0, 0, 0, .125)",
		large: "0 0 24px rgba(0, 0, 0, .125)",
	},
	variants: {
		card: {
			bg: 'white',
			borderRadius: 3,
		},
		box: {
			bg: 'background',
		},
		scrollList: {
			overflowY: 'scroll',
			'::-webkit-scrollbar': {
				width: '10px'
			},
			'::-webkit-scrollbar-thumb': {
				bg: 'secondary'
			}
		},
		listItem: {
			'&:hover': {
				bg: 'highlight'
			},
			cursor: 'pointer'
		}
	},
	text: {
		text: {
            color: 'text',
			fontSize: 0,
        },
        heading1: {
            color: 'text',
            fontSize: 4,
			fontWeight: 'bold',
			mb: 2
        },
        heading2: {
            color: 'text',
            opacity: 0.8,
            fontSize: 3,
            fontWeight: 'bold',
        },
        heading3: {
            color: 'text',
            fontWeight: 'bold',
            fontSize: 1,
        },
        label: {
            color: 'text',
            fontWeight: 400,
            mb: 1,
        },
	},
	forms: {
		input: {
			borderWidth: 0,
			borderBottomWidth: 2,
			borderColor: 'secondary',
			outline: 'none',
			mb: 2,
			'&:active, &:focus': {
				borderColor: 'primary',
			}
		}
	},
	buttons: {
		primary: {
			color: 'text',
			fontWeight: 'bold',
			bg: 'primary',
			outline: 'none',
			cursor: 'pointer',
			py: 2
		},
	},
};
