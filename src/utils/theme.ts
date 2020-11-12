export const theme = {
    breakpoints: ["40em", "52em", "64em", "94em"],
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
        small: "0 0 8px rgba(0, 0, 0, .125)",
        large: '0 0 16px rgba(0, 0, 0, .25)',
    },
    variants: {
        card: {
            bg: 'white',
            borderRadius: 3,
            width: '100%',
            boxShadow: 'small',
        },
        highCard: {
            extends: 'card',
            boxShadow: 'large',
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
            fontSize: 2,
            fontWeight: 600,
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
            },
            '&[type="time"], &[type="date"]': {
                fontFamily: 'Arial !important',
            },
        },
        select: {
            borderWidth: 2,
            borderColor: 'secondary',
            outline: 'none',
            borderRadius: 4,
            '&:active, &:focus': {
                borderColor: 'primary',
            },
        },
        label: {
            color: 'primary',
            fontWeight: 600,
            fontSize: 1,
            mb: 1,
        },
        textarea: {
            borderWidth: 2,
            borderColor: 'secondary',
            outline: 'none',
            borderRadius: 4,
            fontFamily: 'Arial',
        }
    },
    buttons: {
        primary: {
            color: 'background',
            fontWeight: 'bold',
            bg: 'primary',
            outline: 'none',
            cursor: 'pointer',
            py: 2,
            shadow: '0 0 16px rgba(0, 0, 0, .25)',
            transition: 'transform .25s',
            transform: 'translateY(0px)',
            '&:hover:not([disabled])': {
                '-webkit-box-shadow': 'inset 0px 0px 28px -5px rgba(0,0,0,0.4)',
                '-moz-box-shadow': 'inset 0px 0px 28px -5px rgba(0,0,0,0.4)',
                'box-shadow': 'inset 0px 0px 28px -5px rgba(0,0,0,0.4)'
            },
            '&:active': {
                transform: 'translateY(3px)',
            },
            '&:disabled': {
                cursor: 'unset',
                opacity: '0.6',
            }
        },
        icon: {
            p: 2,
            bg: 'transparent',
            color: 'text',
            m: 0,
            cursor: 'pointer',
            outline: 'none',
        }
    },
};
